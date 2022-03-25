import React from "react";

import Body from "../../../engine/body";

class ColorSelector extends React.Component {

    changeColor = (index) => {
        this.props.body.setColor(index);
        this.forceUpdate();
    }

    grid() {
        return Body.colorOptions.map((s, i) => (
            <ColorSelectBox 
                handleClick={this.changeColor}
                highlight={this.props.body.color === s}
                key={i} color={s} index={i}
            />
        ));
    }
    render() {
        return (
            <div className="colorSelector">
                {this.grid()}
            </div>
        );
    }
}

class ColorSelectBox extends React.Component {
    click = () => {
        this.props.handleClick(this.props.index);
    }

    render() {
        let c = "colorBox grid" + (this.props.highlight ? " current" : "");
        let s = { background: this.props.color };
        return (
            <div className={c} style={s} onClick={this.click}></div>
        );
    }
}

export default ColorSelector;