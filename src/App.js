import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy,useSnapshot } from "valtio"
import State from './State';
import Shoe from './Shoe';
import Picker from "./Picker";
import ExportOnSave from "./ExportOnSave"
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

  
  export default function App() {
    const shoeRef= useRef();
    return (
      <>
      <Picker />
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
          <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          
          <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
            <Shoe shoeRef={shoeRef} />
            <Environment files="squash_court_4k.hdr" />
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
          </Suspense>
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
        </Canvas>
        <ExportOnSave shoeRef={shoeRef}/>
      </>
    )
  }


