import { useState } from "react"
import ShapeEditor from "./ShapeEditor"

import React from 'react'

function Web3D() {
    const [canvas, toggleCanvasType] = useState(<ShapeEditor></ShapeEditor>);

    function onDropDownChanged(event){
        var mode = event.target.value
        if (mode == Modes.Shapes){
            toggleCanvasType(<ShapeEditor></ShapeEditor>)
        } else if (mode == Modes.Words){
            toggleCanvasType(<p>Words</p>)
        }
    }

    return (
        <div className="container">
            {canvas}
            <div className="controls">
                <select onChange={(event)=>{onDropDownChanged(event)}}>
                    <option value={Modes.Shapes}>Shapes</option>
                    <option value={Modes.Words}>Words</option>
                    <option value={Modes.Harold}>Harold</option>
                    <option value={Modes.Teddy}>Teddy</option>
                </select>
            </div>
        </div>
    )
    
}



const Modes = {
    Shapes: 0,
    Words: 1,
    // Harold: 2,
    // Teddy: 3
 };

export default Web3D