import * as THREE from 'three';
import  React from "react";
import TemplateCanvas from './TemplateCanvas'

class ShapeEditor extends TemplateCanvas {
    // Create class variables
    scene = null
    renderer = null
    camera = null
    pickedObject = null

    colors = {
        lightPink: 0xF5BFD2,
        darkPink: 0xff26ac
    }

    render(){   
        // This is required to to attach the Three.js ref to component
        return <div ref={ref => (this.mount = ref)}/> 
    }

    addCube(x = 0, y = 0, z = 0){
        const scene = this.scene
        const renderer = this.renderer
        const camera = this.camera

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial( { color: this.colors.lightPink } )
        const cube = new THREE.Mesh( geometry, material )

        cube.position.set(x,y,z)
        scene.add( cube )
        renderer.render( scene, camera );
    }


    onMouseClick = () => {
        const scene = this.scene
        const raycaster = this.raycaster

        if (this.pickedObject){
            scene.remove(this.pickedObject)
            this.pickedObject = null
        } else {
            const objectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1))
            var intersect = raycaster.ray.intersectPlane(objectPlane);
            this.addCube(intersect.x, intersect.y, intersect.z)
        }
    }


    renderScene = () => {
        const renderer = this.renderer
        const scene = this.scene
        const camera = this.camera
        const raycaster = this.raycaster
        const mouse = this.mouse

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );
    
        // Calculate intersections
        const checkIntersects = () => {
            var intersects = raycaster.intersectObjects( scene.children );
            if ( intersects.length > 0 ) {
                if ( intersects[0].object != this.pickedObject ){
                    // restore previous intersection object (if it exists) to its original color
                    if ( this.pickedObject )
                        this.pickedObject.material.color.setHex( this.pickedObject.currentHex );
                        this.pickedObject = intersects[ 0 ].object;
                        this.pickedObject.currentHex = this.pickedObject.material.color.getHex();
                        this.pickedObject.material.color.setHex( this.colors.darkPink );
                }
            } else {
                // restore previous intersection object (if it exists) to its original color
                if ( this.pickedObject ){
                    this.pickedObject.material.color.setHex( this.pickedObject.currentHex )
                }
                this.pickedObject = null;
            }
        }

        const rotateCubes = () => {
            scene.children.forEach(child => {
                child.rotation.x += 0.01
                child.rotation.y += 0.01
            });
        }

        // Call animating functions
        rotateCubes()
        checkIntersects()
        renderer.render( scene, camera )
        window.requestAnimationFrame(this.renderScene)
    }
}

export default ShapeEditor