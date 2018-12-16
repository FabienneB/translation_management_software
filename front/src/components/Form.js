import React from 'react';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A translation was submitted: ' + this.state.value);
      fetch('http://localhost:3001/v1/translations', {
        method: 'POST',
        headers: {
          'Access-Control-Request-Method': '*',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.state.key,
          language: this.state.language,
          value: this.state.translation,
        })
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
            <input type="text" name="translation" value={this.state.translation} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default Form;
