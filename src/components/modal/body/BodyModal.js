import React from "react";

import ColorSelector from "./ColorSelector";
import TrailSliders from "./TrailSliders";
import BodyLocation from "./BodyLocation";
import "../../../style/body.css";

class BodyModal extends React.Component {
    render() {
        return (
            <div className="bodyModal">
                <div className="bodyModalLeftWrapper">
                    <ColorSelector body={this.props.body} />
                    <TrailSliders body={this.props.body} />
                </div>
                <div className="bodyModalRightWrapper">
                    <BodyLocation body={this.props.body} collection={this.props.collection}/>
                </div>
            </div>
        );
    }
}

export default BodyModal;