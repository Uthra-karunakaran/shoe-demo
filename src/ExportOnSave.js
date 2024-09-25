import React, { forwardRef } from 'react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

function ExportOnSave({shoeRef}){
    const exporter=()=>{
        const exporter = new GLTFExporter();
        const scene = shoeRef.current;
        console.log(scene)
        console.log("saved");
       exporter.parse(
        scene,
        (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'customized_shoe.glb';
        link.click();
      },
        { binary: true }
        )
       
    }
    return(
      <button className="save-btn" onClick={exporter}>
        Save
      </button>
    )
  }

export default ExportOnSave;