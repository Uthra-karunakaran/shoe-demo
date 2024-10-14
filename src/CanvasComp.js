import React from 'react'
import { Suspense, useRef, useState, useEffect } from "react"
import * as fabric from "fabric"
import { proxy, useSnapshot } from "valtio"
import State from './State';
import { FabricImage } from 'fabric'; // migration path

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
const canvasElement = fabricCanvasRef.current.getElement();
const ctx = canvasElement.getContext('2d');
ctx.imageSmoothingEnabled = true; // Enables smoothing for images

        return()=>{
            if(fabricCanvasRef.current){
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current=null;
            }
           
        };
    },[snap]);

    
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
    function getScaleFactor(imageWidth, imageHeight, canvasWidth, canvasHeight) {
        // Calculate aspect ratios
        const imageAspectRatio = imageWidth / imageHeight;
        const canvasAspectRatio = canvasWidth / canvasHeight;
    
        let scale;
        // Determine scale based on aspect ratios to fit the image into the canvas
        if (imageAspectRatio > canvasAspectRatio) {
            // Image is wider, scale based on width
            scale = canvasWidth / imageWidth;
        } else {
            // Image is taller, scale based on height
            scale = canvasHeight / imageHeight;
        }
    
        return { scale };
    }
    // https://cdn.pixabay.com/photo/2023/03/25/21/15/clover-7876940_1280.png
    const addImage = async() => {
        const externalImageUrl = 'choices.svg'; // Replace with your image URL
        console.log("adding image to the canvas")


        try {
            const oImg = await fabric.Image.fromURL(externalImageUrl);
            // Set properties to enable controls
            oImg.scale(0.5); // Scale down to 50%
            let theScaleFactor=getScaleFactor(oImg.width,oImg.height,snap.canvasWidth,snap.canvasWidth)
            // let  filter = new fabric.Image.filters.Resize();
            // oImg.filters.push(new fabric.Image.filters.Resize({
            //     resizeType: 'sliceHack',  // A specific resizing method or algorithm in Fabric.js
            //     scaleX: theScaleFactor.scale,  // Horizontal scale factor
            //     scaleY: theScaleFactor.scale   // Vertical scale factor
            // }));
            
    
    oImg.set({
        left: 100,             // Initial position (x)
        top: 100,              // Initial position (y)
        angle: 0,              // Initial rotation angle
        padding: 10,           // Padding for the controls
        cornersize: 10,        // Size of the corner controls
        hasControls: true,     // Enables scaling and rotation controls
        hasBorders: true,      // Displays borders around the object
        selectable: true       // Makes the image selectable
      });
      oImg.set({
        left: ((snap.canvasWidth/ 2) - (parseInt(snap.canvasWidth) * theScaleFactor.scale) / 2),
        top: (45 - (parseInt(snap.canvasHeight * theScaleFactor.scale) / 2))
    });
            console.log('Image loaded:', oImg); // Check if the image loads
            fabricCanvasRef.current.add(oImg);
            fabricCanvasRef.current.renderAll(); // Refresh the canvas to show the added image
        
            const dataUrl = fabricCanvasRef.current.toDataURL({
              format: "png",
              multiplier:2 ,
            });
        
            onTextureReady(dataUrl);
          } catch (error) {
            console.error('Failed to load image:', error);
          }
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
        <button onClick={addImage}>Add Image</button>
        <canvas ref={canvasRef} id='c' /> 
        </div>
    )
}

export default CanvasComp