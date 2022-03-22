import ReactDOM from "react-dom";

import './App.css'
import './index.css'

import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Output from "./Output";

export const serverUrl = new URL('https://api.genderize.io');

function App() {
  return (
      <section className='content' id="content">
        <form className='content__form form'>
          <Input />
          <SubmitButton />
        </form>
        <Output />
          <div className='error_content-wrapper' id='error_content-wrapper'></div>
      </section>
  )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);