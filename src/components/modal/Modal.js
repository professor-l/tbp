import React from "react";

import "../../style/modal.css";

class Modal extends React.Component {
    nullClick(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="modal" onClick={this.props.close}>
                <div className="modalBox" onClick={this.nullClick}>
                    <div className="modalHeader">
                        <div><h1>{this.props.title}</h1></div>
                        <div className="closeModal" onClick={this.props.close}>
                            <span>X</span>
                        </div>
                    </div>
                    <div className="modalBody">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;