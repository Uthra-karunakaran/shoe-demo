import React, { Suspense, useRef, useState, useEffect , forwardRef} from "react"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { proxy,useSnapshot } from "valtio"
import State from './State'

function Shoe({shoeRef}) {
    // const ref=useRef();
    const snap=useSnapshot(State)
    const [hover,setHover]=useState(null);
    const { nodes, materials } = useGLTF('shoe-draco.glb')
    return (
      <group ref={shoeRef} dispose={null}
      onPointerDown={(e)=>(e.stopPropagation(), (State.current = e.object.material.name))}
      onPointerMissed={(e)=>(State.current=null)}
      >
        <mesh geometry={nodes.shoe.geometry}   material-color={snap.items.laces} material={materials.laces} />
        <mesh geometry={nodes.shoe_1.geometry} material-color={snap.items.mesh} material={materials.mesh} />
        <mesh geometry={nodes.shoe_2.geometry} material-color={snap.items.caps} material={materials.caps} />
        <mesh geometry={nodes.shoe_3.geometry} material-color={snap.items.inner} material={materials.inner} />
        <mesh geometry={nodes.shoe_4.geometry} material-color={snap.items.sole} material={materials.sole} />
        <mesh geometry={nodes.shoe_5.geometry} material-color={snap.items.stripes} material={materials.stripes} />
        <mesh geometry={nodes.shoe_6.geometry} material-color={snap.items.band} material={materials.band} />
        <mesh geometry={nodes.shoe_7.geometry} material-color={snap.items.patch} material={materials.patch} />
      </group>
    )
    }
export default Shoe;