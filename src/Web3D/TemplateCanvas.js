import * as THREE from 'three';
import  React from "react";

/*
    This class is used to abstract out the Three.js specific startup work, other canvas components can just extend this
*/

class TemplateCanvas extends React.Component {
    scene = null
    renderer = null
    camera = null
    pickedObject = null

    componentDidMount(){
        this.initCanvas()
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('click', this.onMouseClick);
    }

    initCanvas(){
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
        const renderer = new THREE.WebGLRenderer({ alpha:true})

        renderer.setSize( window.innerWidth, window.innerHeight )
        this.mount.appendChild( renderer.domElement )
        camera.position.z = 5
    
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        window.requestAnimationFrame(this.renderScene);
    }

    onWindowResize = () => {
        const width = this.mount ? this.mount.clientWidth : window.innerWidth;
        const height = this.mount ? this.mount.clientHeight : window.innerHeight;
    
        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };


    onMouseMove = (event) => {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( (event.clientX+ window.scrollX)/ window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( (event.clientY+ window.scrollY) / window.innerHeight ) * 2 + 1;
    }
}

export default TemplateCanvas