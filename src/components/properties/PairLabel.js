import React from "react";

class PairLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            x: this.props.object.x,
            y: this.props.object.y
        };

        this.updateInterval = null;
    }

    componentDidMount() {
        this.updateInterval = window.setInterval(this.update, 150);
    }

    componentWillUnmount() {
        window.clearInterval(this.updateInterval);
    }

    update = () => {
        this.setState({
            x: this.props.object.x,
            y: this.props.object.y
        });
    }

    // Aesthetic preparation
    x() {
        return this.state.x.toFixed(2).padStart(7, "\u00a0");
    }
    y() {
        return this.state.y.toFixed(2).padEnd(7, "\u00a0");
    }

    render() {
        return (
            <tr>
                <td className="labelType">
                    <span>
                        {this.props.label}:
                    </span>
                </td>
                <td className="labelValue">
                    <span>
                        [ <span>{this.x()}</span> , <span>{this.y()}</span> ]
                    </span>
                </td>
            </tr>
        );
    }
}

export default PairLabel;