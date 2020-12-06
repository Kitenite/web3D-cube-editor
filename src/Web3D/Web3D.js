import { useState } from "react"
import Canvas from "./Canvas"

function Web3D() {
    const [testVal, setTestVal] = useState(0);

    return (
        <div className="container">
            <div className="controls">
                <button onClick={onTestButtonClicked}>Hello</button>
            </div>
            <Canvas test={testVal}></Canvas>
        </div>
    )

    function onTestButtonClicked(){
        console.log(testVal)
        setTestVal(testVal+1)
    }
}

export default Web3D