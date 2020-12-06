import React from "react";
import Canvas from "./Canvas"

class Web3D extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            testVal:0
        }
        this.onTestButtonClicked = this.onTestButtonClicked.bind(this)
    }

    render(){
        return (
            <div className="container">
                <div className="controls">
                    <button onClick={this.onTestButtonClicked}>Hello</button>
                </div>
                <Canvas test={this.state.testVal}></Canvas>
            </div>
        )
    }

    onTestButtonClicked(){
        this.setState({testVal:this.state.testVal+1})
    }
}

export default Web3D