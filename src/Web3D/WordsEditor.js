import * as THREE from 'three';
import React from "react";
import TemplateCanvas from './TemplateCanvas'

class WordsEditor extends TemplateCanvas {

    render(){   
        // This is required to to attach the Three.js ref to component
        return <div ref={ref => (this.mount = ref)}/> 
    }

    renderScene = () => {
        const renderer = this.renderer
        const scene = this.scene
        const camera = this.camera
        const raycaster = this.raycaster
        const mouse = this.mouse

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );
    
        
        // Call animating functions
        renderer.render( scene, camera )
        window.requestAnimationFrame(this.renderScene)
    }
}

export default WordsEditor