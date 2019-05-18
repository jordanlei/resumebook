import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Row, Col } from 'reactstrap';
import Layout from './components/Layout';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '',
        age: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        console.log("got here")
        var json = this.state;
        console.log(json);
        fetch(`/api/createperson`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        })
          .then(res => res.text())
          .then(res => console.log(res));
    }

    render() {
        return (
        <Form>
            <FormGroup>
                <Label for="name">Name?</Label>
                <Input
                    type="text"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="age">Age?</Label>
                <Input
                    type="number"
                    id="age"
                    value={this.state.age}
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <div className="center-row" id="submit">
                <Button id="submit" onClick={this.handleSubmit}>
                     Submit
                </Button>
            </div>
        </Form>
        );
    }
  }
  
  export default People;