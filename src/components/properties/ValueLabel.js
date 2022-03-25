import React from "react";

class ValueLabel extends React.Component {

    capitalize(s) {
        return s[0].toUpperCase() + s.substring(1);
    }

    render() {
        return (
            <div className="singleLabelWrapper">
                <span className="singleLabelType">
                    {this.props.label}
                </span><br />
                <span className="singleLabelValue">
                    {this.props.body[this.props.name].toFixed(this.props.int ? 2 : 0)}
                </span>
            </div>
        );
    }
}

export default ValueLabel;