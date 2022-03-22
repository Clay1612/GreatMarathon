import React from "react";
import ReactDOM from "react-dom";

import {serverRequest} from "./serverRequest";
import {serverUrl} from "./App";
import Error from "./Error";

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
    }

    async handler(event) {
        event.preventDefault();

        const firstName = document.getElementById('name-field').value;
        const url = `${serverUrl}?name=${firstName}`;
        this.setState({firstName: firstName})

        const response = await serverRequest(url);
        document.getElementById('gender-result').textContent = `${firstName} is ${response.gender}`;

        if (firstName.length < 2) {
            ReactDOM.render(
                <Error />,
                document.getElementById('error_content-wrapper')
            );
        } else {
            ReactDOM.render(
                null,
                document.getElementById('error_content-wrapper')
            );
        }
    }

    render() {
        return (
            <input type="submit" value="Check your Sex" className="form__submit-button" onClick={this.handler}/>
        )
    }
}

export default SubmitButton
