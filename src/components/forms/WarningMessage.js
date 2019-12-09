import * as React from "react";
import InputAppend from "./InputAppend"
import WarningIcon from "../icons/Warning"

export default class WarningMessage extends React.Component {


    render() {
        return (

                <InputAppend>
                    <WarningIcon height="32px" width="32px" />
                    <p className="my-2 px-1">
                        {this.props.text}
                    </p>
                </InputAppend>

        );
    }
}


