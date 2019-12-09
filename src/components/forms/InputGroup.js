import * as React from "react";


export default class InputGroup extends React.Component {

    render() {
        return (
            <div className="input-group input-group-lg mb-3">
                {this.props.children}
            </div>
        );
    }
}


