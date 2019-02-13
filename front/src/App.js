import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/Input-Form';
import 'bootstrap/dist/css/bootstrap.css';

function downloadTranslations() {
  return fetch('http://localhost:3001/v1/translations')
    .then(result => result.json());
}

downloadTranslations().then(translations => console.log(translations))
.catch(console.error)

class App extends Component {
  render() {
    return (
      <div className="App">
        <InputForm />
      </div>
    );
  }
}

export default App;
