import * as React from "react";


export default class Warning extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <svg height={this.props.height} class="octicon octicon-alert"
                viewBox="0 0 16 16" version="1.1" width={this.props.width}>
                <path fillRule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 000 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 00.01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path>
            </svg>
        
    }
}

Warning.defaultProps = {
    height: "32px",
    width: "32px"
}