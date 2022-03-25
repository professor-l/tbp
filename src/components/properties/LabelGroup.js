import React from "react";

import PairLabel from "./PairLabel"

class LabelGroup extends React.Component {
    constructor(props) {
        super(props);
        
        if (props.center)
            this.first = "CENTER OF MASS"
        else
            this.first = "POSITION"
    }

    render() {
        return (
            <div className="labelWrapper">
                <table className="labelGroup">
                    <tbody>
                    <PairLabel object={this.props.object.position} label={this.first} />
                    <PairLabel object={this.props.object.velocity} label="VELOCITY" />
                    </tbody>
                </table>
            </div>
        );
    }
}



export default LabelGroup;