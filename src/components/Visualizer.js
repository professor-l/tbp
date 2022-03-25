import React from "react";

class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.animator = this.props.animator;
        this.animator.changeScale(1.5);

        this.state = { opacity: 1 };
    }

    get isRunning() {
        return this.aniumator.isRunning;
    }

    componentDidMount() {
        // Initialize animator once component is rendered
        this.animator.initialize();
        this.animator.draw();
        this.animator.toggle();
    }

    setOpacity(opacity) {
        this.setState({opacity: opacity});
    }

    toggle() {
        this.animator.togglePause();
    }

    render() {
        let cssObject = {
            zIndex: this.props.index,
            opacity: this.state.opacity
        }

        this.animator.dimensionUpdate();
        
        return (
            <canvas className="collection" id={this.animator.id}
            width={this.props.size} height={this.props.size} style={cssObject}/>
        );
    }

}

export default Visualizer;