import React from 'react';
import axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class InputForm extends React.Component {
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
        <Form onSubmit={this.handleSubmit}>
          <Col sm={{size: 10, offset: 1}}>
            <h3> New translation: </h3>
            <FormGroup row>
              <Label for="key" sm={2}>Key:</Label>
              <Col sm={8}>
                <Input type="text" name="key" id="key" value={this.state.key} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="language" sm={2}>Language:</Label>
              <Col sm={8}>
                <Input type="text" name="language" id="language" value={this.state.language} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="language" sm={2}>Value:</Label>
              <Col sm={8}>
                <Input type="text" name="value" id="value" value={this.state.value} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button type="submit" value="Submit">Submit</Button>
          </Col>
        </Form>
      );
    }
  }

  export default InputForm;
