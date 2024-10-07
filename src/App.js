import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas,useLoader} from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { TextureLoader } from "three"
import { proxy,useSnapshot } from "valtio"
import State from './State';
import Picker from "./Picker";
import ExportOnSave from "./ExportOnSave"
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { ImageUpload } from "./ImageUpload"
import { MugEdited } from "./MugEdited"
import CanvasComp from "./CanvasComp"
  
  export default function App() {
    const shoeRef= useRef();
    const textureRef=useRef();
    const [texture,setTexture]=useState('');
    const snap=useSnapshot(State)
    useEffect(()=>{
  
          console.log(snap.imageUrl);
          console.log(snap.canvasHeight);
          console.log(snap.canvasWidth);
    },[texture])
    const handleTextureReady=(textureUrl)=>{
      console.log("called");
      const textureLoader=new TextureLoader();
      textureLoader.load(textureUrl,(texture)=>{
        // textureRef.current=texture;
        setTexture(texture);
      })
      console.log(texture);
    }
    return (
      <>
     
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, -0.5, 2.85] }}>
          <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
            
            <MugEdited texture={texture}/>
            
            <Environment files="squash_court_4k.hdr" />
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
          </Suspense>
          <OrbitControls />
        </Canvas>
        
      <CanvasComp onTextureReady={handleTextureReady}/>

      
       
      </>
    )
  }


