import React from "react";

import ColorBox from "../properties/ColorBox";
import LabelGroup from "../properties/LabelGroup";
import ValueLabel from "../properties/ValueLabel";
import Modal from "../modal/Modal";
import BodyModal from "../modal/body/BodyModal";

class BodyInterface extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

    }

    highlight = () => {
        this.props.body.highlight = true;
    }

    unhighlight = () => {
        this.props.body.highlight = false;
    }

    showModal = () => {
        if (!this.state.modal && this.props.editable)
            this.setState({modal: true});
    }

    hideModal = () => {
        this.setState({modal: false});
        this.unhighlight();
    }

    getModal() {
        if (this.state.modal) {
            return (
                <Modal close={this.hideModal} title={"Body Editor"}>
                    <BodyModal body={this.props.body} collection={this.props.collection}/>
                </Modal>
            );
        }
        else
            return "";
    }

    render() {
        return (
            <div className="bodyInterface" 
            onMouseEnter={this.highlight}
            onMouseLeave={this.unhighlight}
            onClick={this.showModal}>

                {this.getModal()}

                <div className="interfaceFixedWrapper">
                    <ColorBox body={this.props.body} />
                </div>
                
                <div className="interfaceOuterWrapper">
                    <div className="interfaceInnerWrapper">
                        <LabelGroup object={this.props.body} />
                    </div>

                    <div className="interfaceInnerWrapper">
                        <ValueLabel name="mass"
                            label="Mass" body={this.props.body} int={true}/>

                        <ValueLabel name="trailLength"
                            label="Trail len" body={this.props.body} />

                        <ValueLabel name="trailThickness"
                            label="Trail thick" body={this.props.body} /> 
                    </div>
                </div>
            </div>
        );
    }
}

export default BodyInterface;