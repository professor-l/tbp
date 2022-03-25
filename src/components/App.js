import React from "react";

import Visualizer from "./Visualizer";
import Interface from "./Interface";

import BodyCollection from "../engine/collection";
import Animator from "../engine/animate";

class App extends React.Component {

    constructor(props) {
        super(props);

        // Initialize default body collection
        let c = new BodyCollection();
        c.addBody(91, -44);
        c.addBody(-13, -32);
        c.addBody(26, 45);
        this.animators = [new Animator(c, "canvas0")];

        this.state = {
            canvasSize: 0,
            paused: true
        };
    }

    componentDidMount() {
        this.updateCanvasSize();
        window.addEventListener("resize", this.updateCanvasSize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateCanvasSize);
    }

    updateCanvasSize = () => {
        this.setState({ canvasSize: Math.min(window.innerWidth, window.innerHeight) });
    }

    toggleAll = () => {
        this.animators.forEach(a => a.togglePause());
        this.setState({paused: !this.state.paused});
    }

    visualizers() {
        return this.animators.map(
            (a, i) => (
                <Visualizer animator={a} key={i} index={i}
                size={this.state.canvasSize}/>
            )
        );
    }

    render() {
        let cssObject = {
            width: this.state.canvasSize,
            height: this.state.canvasSize,
            minWidth: this.state.canvasSize,
            flexBasis: this.state.canvasSize
        };

        return (
            <div className="App">
                <div className="collectionVisuals"
                style={cssObject} onClick={this.toggleAll}>
                    {this.visualizers()}
                </div>
                 <div className="collectionInterface">
                    <Interface collections={this.animators.map(a => a.collection)}
                    editable={this.state.paused} />
                 </div>
            </div>
        );
    }


}

export default App;
