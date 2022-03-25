import React from "react";

import BodyCollection from "../../engine/collection";
import LabelGroup from "../properties/LabelGroup";

class CollectionMeta extends React.Component {

    render() {
        let b = this.props.collection.bodies.length;
        let t = BodyCollection.MAX_BODIES;
        return (
            <div className="collectionMeta">
                <div className="collectionTitle">
                    <span>Collection {this.props.index + 1}</span>
                </div>
                <div className="collectionInfo">
                    <LabelGroup object={this.props.collection} center={true} />
                    <div className="bodyCount">
                        <span>Bodies: <span>{b}</span> / <span>{t}</span></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CollectionMeta;