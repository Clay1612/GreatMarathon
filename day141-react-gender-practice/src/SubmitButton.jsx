import {serverRequest} from "./serverRequest";
import {serverUrl} from "./App";

function SubmitButton() {
    async function handler(event) {
        event.preventDefault();

        const firstName = document.getElementById('name-field').value;
        const url = `${serverUrl}?name=${firstName}`;

        const response = await serverRequest(url);

        document.getElementById('gender-result').textContent = `${firstName} is ${response.gender}`;
    }

    return (
        <input type="submit" value="Check your Sex" className="form__submit-button" onClick={handler}/>
    )
}

export default SubmitButton
