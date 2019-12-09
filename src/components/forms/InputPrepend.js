import * as React from "react";


export default class InputPrepend extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="input-group-prepend">
                <span className="input-group-text" >{this.props.text}</span>
            </div>
        );
    }
}


