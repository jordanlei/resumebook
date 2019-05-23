import React, { Component } from 'react';
import Router from 'next/router';
import { Form, FormGroup, Label, Input, Button, FormText, Row, Col } from 'reactstrap';
import SimpleTitle from './components/SimpleTitle';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';

class PeopleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        username: '',
        password: '',
        age: '',
        submitted: false
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
        var json = this.state;
        console.log(json)
        fetch(`/api/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        })
          .then(res => res.text())
          .then(res => console.log(res));
        //this.setState({submitted: true});
    }

    render() {
        var thisname= 'someonee'
        if(this.state.submitted)
        {
            console.log("Redirecting ...")
            Router.push({
                pathname: `/view/${thisname}`,
                query: { id: thisname }
            })
        }
        return (
        <Layout>
            <SimpleTitle>
                <h3>Create a New User</h3>
            </SimpleTitle>
            <div className= "light-container">
            <StyleDiv>
                <Form style={{paddingLeft: "20%", paddingRight:"20%", paddingTop:"5%"}}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            value={this.state.password}
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
            </StyleDiv>
            </div>
        </Layout>
        );
    }
  }
  
  export default PeopleForm;