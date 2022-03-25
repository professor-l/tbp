import React from "react";
import Body from "../../../engine/body";

class TrailSliders extends React.Component {
    alterMass = (mass) => {
        this.props.body.setMassSafe(mass);
    }

    render() {
        return (
            <div className="bodySliders">
                <BodySlider 
                    min={Body.MIN_MASS} max={Body.MAX_MASS} step={0.01}
                    fieldName="mass" body={this.props.body}
                    label="Mass" special={this.alterMass}
                />
                <BodySlider
                    min={0} max={Body.MAX_TRAIL_LENGTH} step={1}
                    fieldName="trailLength" body={this.props.body}
                    label="Trial length"
                />
                <BodySlider
                    min={1} max={this.props.body.radius} step={1}
                    fieldName="trailThickness" body={this.props.body}
                    label="Trail thick"
                />
            </div>
        );
    }
}

class BodySlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.body[this.props.fieldName]
        };
    }

    edit = (event) => {
        let value = parseFloat(event.target.value);

        if (this.props.special)
            this.props.special(value);
        else
            this.props.body[this.props.fieldName] = value;
        
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="bodySliderWrapper">
                <label className="slider" htmlFor={this.props.fieldName}>
                    {this.props.label}
                </label>
                <div className="sliderContainer">
                    <input 
                        type="range"
                        name={this.props.fieldName}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        defaultValue={this.props.body[this.props.fieldName]}
                        onChange={this.edit}
                    />
                </div>
                <label className="slider value">{this.state.value}</label>
            </div>
        );
    }
}

export default TrailSliders;