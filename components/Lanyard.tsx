/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  size?: number;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  size = 1,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth < 768
  );

  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      );
  }, []);

  return (
    <div
      className={`relative z-0 flex h-full w-full items-center justify-center ${isCardHovered ? 'cursor-target' : ''}`}
      style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
    >
      <Canvas
        camera={{
          position,
          fov,
        }}
        dpr={isMobile ? 1 : 1.5}
        gl={{
          alpha: transparent,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(
            new THREE.Color(0x000000),
            transparent ? 0 : 1
          );

          gl.outputColorSpace =
            THREE.SRGBColorSpace;

            gl.toneMappingExposure = 1.2;
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={isMobile ? 0.8 : 1.5} />

        {/* Physics */}
        <Physics
          gravity={gravity}
          timeStep={isMobile ? 1 / 30 : 1 / 60}
          maxStabilizationIterations={isMobile ? 1 : 3}
        >
          <Band isMobile={isMobile} onCardHover={setIsCardHovered} maxSpeed={isMobile ? 12 : 20} minSpeed={isMobile ? 3 : 5} />
        </Physics>

        {/* Environment */}
        <Environment blur={isMobile ? 0.2 : 0.5}>
          <Lightformer
            intensity={isMobile ? 1.5 : 3}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[50, 0.1, 1]}
          />

          <Lightformer
            intensity={isMobile ? 2 : 5}
            color="white"
            position={[-6, 0, 10]}
            rotation={[
              0,
              Math.PI / 2,
              Math.PI / 3,
            ]}
            scale={[50, 5, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  onCardHover?: (hovered: boolean) => void;
}

function Band({
  maxSpeed = 20,
  minSpeed = 5,
  isMobile = false,
  onCardHover,
}: BandProps) {
  const band = useRef<any>(null);

  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  /* Reuse vectors instead of recreating them every frame */
  const vec = useRef(new THREE.Vector3()).current;
  const ang = useRef(new THREE.Vector3()).current;
  const rot = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF("/card.glb") as any;

  const texture = useTexture("/lanyard.png") as any;
  useEffect(() => {
  if (!texture) return;

  texture.anisotropy = 16;
  texture.needsUpdate = true;
}, [texture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] =
    useState<false | THREE.Vector3>(false);

  const [hovered, hover] = useState(false);

  useRopeJoint(
    fixed,
    j1,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    j1,
    j2,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    j2,
    j3,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (!hovered) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = dragged
      ? "grabbing"
      : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    /*
      Dragging
    */
    if (dragged && typeof dragged !== "boolean") {
      vec
        .set(
          state.pointer.x,
          state.pointer.y,
          0.5
        )
        .unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      );

      [card, j1, j2, j3, fixed].forEach(
        (ref) => ref.current?.wakeUp()
      );

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    /*
      Rope
    */
    if (!fixed.current) return;

    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) {
        ref.current.lerped =
          new THREE.Vector3().copy(
            ref.current.translation()
          );
      }

      const distance =
        ref.current.lerped.distanceTo(
          ref.current.translation()
        );

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, distance)
      );

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta *
          (minSpeed +
            clampedDistance *
              (maxSpeed - minSpeed))
      );
    });

    curve.points[0].copy(
      j3.current.translation()
    );

    curve.points[1].copy(
      j2.current.lerped
    );

    curve.points[2].copy(
      j1.current.lerped
    );

    curve.points[3].copy(
      fixed.current.translation()
    );

    /*
      Biggest optimization:
      32 → 12 points
    */
    band.current.geometry.setPoints(
      curve.getPoints(
        isMobile ? 8 : 12
      )
    );

    /*
      Card stabilization
    */
    ang.copy(card.current.angvel());

    rot.copy(card.current.rotation());

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    });
  });

  curve.curveType = "chordal";

  if (texture?.wrapS) {
    texture.wrapS =
      THREE.RepeatWrapping;

    texture.wrapT =
      THREE.RepeatWrapping;
  }
  return (
  <>
    <group position={[0, 4, 0]}>
      {/* Fixed Anchor */}
      <RigidBody
        ref={fixed}
        {...segmentProps}
        type={"fixed" as RigidBodyProps["type"]}
      />

      {/* Rope Segments */}
      <RigidBody
        position={[0.5, 0, 0]}
        ref={j1}
        {...segmentProps}
      >
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        position={[1, 0, 0]}
        ref={j2}
        {...segmentProps}
      >
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        position={[1.5, 0, 0]}
        ref={j3}
        {...segmentProps}
      >
        <BallCollider args={[0.1]} />
      </RigidBody>

      {/* Card */}
      <RigidBody
        position={[2, 0, 0]}
        ref={card}
        {...segmentProps}
        type={
          dragged
            ? ("kinematicPosition" as RigidBodyProps["type"])
            : ("dynamic" as RigidBodyProps["type"])
        }
      >
        <CuboidCollider args={[0.8, 1.125, 0.01]} />

        <group
          scale={2.25}
          position={[0, -1.2, -0.05]}
          onPointerOver={() => { hover(true); onCardHover?.(true); }}
          onPointerOut={() => { hover(false); onCardHover?.(false); }}
          onPointerUp={(e: any) => {
            e.target.releasePointerCapture(
              e.pointerId
            );

            drag(false);
          }}
          onPointerDown={(e: any) => {
            e.target.setPointerCapture(
              e.pointerId
            );

            drag(
              new THREE.Vector3()
                .copy(e.point)
                .sub(
                  vec.copy(
                    card.current.translation()
                  )
                )
            );
          }}
        >
          {/* Main Card */}
          <mesh geometry={nodes.card.geometry}>
            <meshStandardMaterial
              map={materials.base.map}
              map-anisotropy={16}
  roughness={0.7}
  metalness={0.4}
            />
          </mesh>

          {/* Clip */}
          <mesh
            geometry={nodes.clip.geometry}
          >
            <meshStandardMaterial
              color="#bdbdbd"
              roughness={0.35}
              metalness={0.8}
            />
          </mesh>

          {/* Clamp */}
          <mesh
            geometry={nodes.clamp.geometry}
          >
            <meshStandardMaterial
              color="#cfcfcf"
              roughness={0.35}
              metalness={0.8}
            />
          </mesh>
        </group>
      </RigidBody>
    </group>

    {/* Rope */}
    <mesh ref={band}>
      {/* @ts-ignore */}
      <meshLineGeometry />

      {/* @ts-ignore */}
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={[512, 512]}
        useMap
        map={texture}
        repeat={[-4, 1]}
        lineWidth={1}
      />
    </mesh>
  </>
);
}