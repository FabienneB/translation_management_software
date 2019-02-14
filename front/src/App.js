import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';
import IndexTranslations from './components/IndexTranslations';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <IndexTranslations />
        <InputForm />
      </div>
    );
  }
}

export default App;
