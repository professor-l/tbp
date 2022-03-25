import React from "react";

class BodyLocation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            x: this.props.body.x,
            y: this.props.body.y
        }
    }
    render() {
        return (
            <div className="bodyLocationWrapper">

            </div>
        );
    }
}

export default BodyLocation;