"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"

function Venus() {
  const venusRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (venusRef.current) {
      venusRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={venusRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#FF9966"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

export default function SimpleVenusModel() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          <Venus />
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}