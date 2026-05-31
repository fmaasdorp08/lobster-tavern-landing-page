"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  Float,
} from "@react-three/drei";

import {
  TextureLoader,
  Vector2,
  WebGLRenderTarget,
  RGBAFormat,
  LinearFilter,
} from "three";

import * as THREE from "three";

import {
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

type Props = {
  backgroundImage: string;
  children?: React.ReactNode;
  className?: string;
};

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position =
    projectionMatrix *
    modelViewMatrix *
    vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
    uv -= disc_center;
    uv *= uResolution;
    float dist = sqrt(dot(uv, uv));
    return smoothstep(disc_radius + border_size, disc_radius - border_size, dist);
}

void main() {

    vec2 uv = vUv;

    float dist = distance(uv, uMouse);

    float ripple =
        sin(dist * 60.0 - uTime * 5.0) * 0.015;

    ripple *= smoothstep(0.35, 0.0, dist);

    vec2 direction = normalize(uv - uMouse);

    uv += direction * ripple;

    vec2 chromaRed = uv + ripple * 0.3;
    vec2 chromaBlue = uv - ripple * 0.3;

    vec4 color;

    color.r = texture2D(uTexture, chromaRed).r;
    color.g = texture2D(uTexture, uv).g;
    color.b = texture2D(uTexture, chromaBlue).b;
    color.a = 1.0;

    float vignette =
        smoothstep(0.8, 0.2, distance(vUv, vec2(0.5)));

    color.rgb *= vignette;

    gl_FragColor = color;
}
`;

function RipplePlane({
  image,
}: {
  image: string;
}) {
  const texture = useLoader(TextureLoader, image);

  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const mouse = useRef(new Vector2(0.5, 0.5));

  const targetMouse =
    useRef(new Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: texture,
      },
      uMouse: {
        value: new Vector2(0.5, 0.5),
      },
      uTime: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(
          window.innerWidth,
          window.innerHeight
        ),
      },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    targetMouse.current.set(
      state.pointer.x * 0.5 + 0.5,
      state.pointer.y * 0.5 + 0.5
    );

    mouse.current.lerp(
      targetMouse.current,
      0.08
    );

    materialRef.current.uniforms.uMouse.value =
      mouse.current;

    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.03}
      floatIntensity={0.08}
    >
      <mesh scale={[8, 5, 1]}>
        <planeGeometry args={[1, 1, 128, 128]} />

        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </Float>
  );
}

export default function WaterRippleHero({
  backgroundImage,
  children,
  className = "",
}: Props) {
  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const mobile =
      window.innerWidth < 768;

    setIsMobile(mobile);
  }, []);

  return (
    <section
      className={`relative h-screen overflow-hidden bg-black ${className}`}
    >
      <div className="absolute inset-0">

        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0, 1],
            fov: 50,
          }}
        >
          <Environment preset="city" />

          <RipplePlane
            image={backgroundImage}
          />

          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={0.15}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full items-center">
        {children}
      </div>
    </section>
  );
}