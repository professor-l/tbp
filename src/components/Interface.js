import React from "react";

import "../style/interface.css";
import CollectionMeta from "./info/CollectionMeta";
import BodyInterface from "./info/BodyInterface";

class Interface extends React.Component {

    constructor(props) {
        super(props);

        this.state = { index: 0 };
    }

    collection() {
        return this.props.collections[this.state.index];
    }

    rows() {
        let c = this.collection();
        return c.bodies.map(
            (b, i) => (
                <BodyInterface collection={c} body={b} key={i} index={i} 
                editable={this.props.editable}/>
            )
        );
    }

    render() {
        return (
            <div className="interface">
                <CollectionMeta collection={this.collection()} 
                index={this.state.index}/>
                
                {this.rows()}
            </div>
        );
    }
}

export default Interface;