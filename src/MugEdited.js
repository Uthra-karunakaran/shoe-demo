import React from 'react'
import { useRef, useState, useEffect } from "react"
import { proxy, useSnapshot } from "valtio"
import State from './State';
import { Vector3 , } from "three"
import { useGLTF } from '@react-three/drei'
import { TextureLoader } from "three"

export function MugEdited({texture}) {
  const { nodes, materials } = useGLTF('mug-uv.glb');
  const textureuv = new TextureLoader().load('uvmap.jpeg' );
  textureuv.flipY = false; // Flip the texture vertically 
  if(texture){
    texture.flipY=false;
  }
  const snap=useSnapshot(State)

  useEffect(() => {
    console.log(snap.imageUrl);
  
    // Assuming `nodes.Cylinder001_1.geometry` is the geometry you're working with
    const geometry = nodes.Cylinder001_1_4.geometry;
  
    // Compute the bounding box if it hasn't been computed yet
    geometry.computeBoundingBox();
  
    // Get the bounding box dimensions
    const boundingBox = geometry.boundingBox;
    const width = boundingBox.max.x - boundingBox.min.x; // width in x-axis
    const height = boundingBox.max.y - boundingBox.min.y; // height in y-axis
    const cylinderRadius = width / 2; // Radius is half the width
  
    // Calculate the circumference of the cylinder (arc length)
    const circumference = 2 * Math.PI * cylinderRadius;
  
    // Adjust canvas aspect ratio to fit the cylinder geometry better
    const textureAspectRatio = circumference / height;
  
    // Choose canvas width (you can modify it as needed)
    const canvasWidth = 700;
  
    // Calculate canvas height while maintaining the correct aspect ratio
    const canvasHeight = canvasWidth / textureAspectRatio;
  
    console.log('Adjusted Aspect Ratio:', textureAspectRatio);
    console.log('Canvas Width:', canvasWidth);
    console.log('Canvas Height:', canvasHeight);
  
    // Update Valtio state with the new canvas dimensions
    State.canvasWidth = canvasWidth;
    State.canvasHeight = canvasHeight;
  
  }, []);
  
  return (
   

        <group scale={0.23} dispose={null}>
         <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['02___Default']} />
        <mesh geometry={nodes.Cylinder001_1_1.geometry} material={materials['01___Default']} />
        <mesh geometry={nodes.Cylinder001_1_2.geometry} material={materials['01___Default-2']} />
        <mesh geometry={nodes.Cylinder001_1_3.geometry} material={materials['02___Default-2']} />
        <mesh geometry={nodes.Cylinder001_1_4.geometry} >
          {/* toggle the meshBasicMaterial after the component is mount */}
        {/* <meshBasicMaterial  transparent opacity={0} /> */}
        
        <meshStandardMaterial
            map={texture}
            // flipY={false} // Try this if the texture appears flipped
            toneMapped={false}
            transparent
            polygonOffset
            polygonOffsetFactor={-1} // The mesh should take precedence over the original
          />
        </mesh>
      </group>
      
    

  )
}