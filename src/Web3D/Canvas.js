import * as THREE from 'three';
import  React from "react";

class Canvas extends React.Component {
    // Create class variables
    scene = null
    renderer = null
    camera = null
    pickedObject = null

    colors = {
        lightPink: 0xF5BFD2,
        darkPink: 0xff0000
    }


    constructor(props) {
        super(props);
        console.log(this.props)

    }

    render(){        
        return (
            <div>
                <div ref={ref => (this.mount = ref)}/>
                <p>Cube Mode: {this.props.addCube ? 'on' : 'off'}</p>

            </div>
            )    
    }

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

    onWindowResize = () => {
        const width = this.mount ? this.mount.clientWidth : window.innerWidth;
        const height = this.mount ? this.mount.clientHeight : window.innerHeight;
    
        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

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

    onMouseMove = (event) => {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( (event.clientX+ window.scrollX)/ window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( (event.clientY+ window.scrollY) / window.innerHeight ) * 2 + 1;

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



export default Canvas