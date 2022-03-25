import React from "react";

class ColorBox extends React.Component {
    render() {
        

        let cssObject = {
            background: this.props.body.color
        }
        return (
            <div className="colorBox" style={cssObject}></div>
        );
    }
}



export default ColorBox;