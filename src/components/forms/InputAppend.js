import * as React from "react";


export default class InputAppend extends React.Component {

    render() {
        return (
            <div className="input-group-append col-12 p-2">
               {this.props.children}
            </div>
        );
    }
}


