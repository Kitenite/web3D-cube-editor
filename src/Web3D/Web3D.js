import { useState } from "react"
import Canvas from "./Canvas"

function Web3D() {
    const [cubeMode, toggleCubeMode] = useState(false);

    return (
        <div className="container">
            <Canvas addCube={cubeMode}></Canvas>

            <div className="controls">
                <button onClick={() => toggleCubeMode(!cubeMode)}>{cubeMode ? 'Cancel': 'Cube Mode' }</button>
            </div>
        </div>
    )
}

export default Web3D