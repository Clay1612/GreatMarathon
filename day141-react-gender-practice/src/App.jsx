import ReactDOM from "react-dom";

import './App.css'
import './index.css'

import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Output from "./Output";

export const serverUrl = new URL('https://api.genderize.io');

function App() {
    
  return (
      <section className='content'>
        <form className='content__form form'>
          <Input />
          <SubmitButton />
        </form>
        <Output />
      </section>
  )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

