import React from 'react'
import { Suspense, useRef, useState, useEffect } from "react"
import * as fabric from "fabric"
import { proxy, useSnapshot } from "valtio"
import State from './State';

function CanvasComp ({onTextureReady}){
    const canvasRef=useRef(null);
    const fabricCanvasRef=useRef(null);
    const snap=useSnapshot(State)
    
    useEffect(()=>{
        if(!fabricCanvasRef.current){
            console.log(snap.canvasHeight)
            console.log(snap.canvasWidth);
            const canvasElement=canvasRef.current;
            canvasElement.width=snap.canvasWidth;
            canvasElement.height=snap.canvasHeight;
        fabricCanvasRef.current=new fabric.Canvas(canvasElement,{
            width:snap.canvasWidth,
            height:snap.canvasHeight
        });

        }
        fabricCanvasRef.current.setWidth(snap.canvasWidth);
fabricCanvasRef.current.setHeight(snap.canvasHeight);
fabricCanvasRef.current.renderAll(); // Refresh the canvas with the new size


        return()=>{
            if(fabricCanvasRef.current){
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current=null;
            }
           
        };
    },[]);

    
    const addCircle=()=>{
        const circle= new fabric.Circle({
            radius:30,
            fill : '#000',
            top: 50,
            left: 125,

        });
        fabricCanvasRef.current.add(circle);
        const dataUrl=fabricCanvasRef.current.toDataURL({
            format:"png",
            multiplier:1,
        })
        onTextureReady(dataUrl);
    };

    const handleExport=()=>{
        const dataUrl=fabricCanvasRef.current.toDataURL({
            format:"png",
            multiplier:1,
        })
        onTextureReady(dataUrl);
    }

    return(
        <div className='canvas-div'> 
        <button onClick={addCircle} >Add circle</button>
        <button onClick={handleExport}>Export as Texture</button>
        <canvas ref={canvasRef} id='c' /> 
        </div>
    )
}

export default CanvasComp