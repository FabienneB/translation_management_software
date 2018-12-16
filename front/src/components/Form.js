import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {key: '', language: '', value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      alert('A translation was submitted: ' + this.state.value);
      const params = { translation: { key: this.state.key, language: this.state.language, value: this.state.value }};
      const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
      axios.post('http://localhost:3001/v1/translations', params, headers).then(response => {
      }).catch((error) => {
          console.log(error);
          alert(error);
      });
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Key:
            <input type="text" name="key" value={this.state.key} onChange={this.handleChange} />
          </label>
          <label>
            Country:
            <input type="text" name="language"  value={this.state.language} onChange={this.handleChange} />
          </label>
          <label>
            Translation:
            <input type="text" name="value" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default Form;
