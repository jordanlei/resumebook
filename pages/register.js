import React, { Component } from 'react';
import Router from 'next/router';
import { Form, FormGroup, Label, Input, Button, Alert, FormText, Row, Col } from 'reactstrap';
import SimpleTitle from './components/SimpleTitle';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        firstName: '', 
        lastName: '', 
        username: '',
        password: '',
        year: '',
        email: '', 
        bio: '', 
        funFact: '',
        error: '',
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
        switch(name){
            case "password":
                if(value== "password")
                {
                    this.setState({error: "Seriously? Your password is password? Try again, fam."})
                }
                else if(value.length < 5)
                {
                    this.setState({error: "Try a longer password."})
                }
                else
                {
                    this.setState({error: ""})
                }
                break
            case "year":
                var year= new Date().getFullYear() + 4
                if(value > year)
                {
                    this.setState({error: "Please choose a valid year."}) 
                }
                else
                {
                    this.setState({error: ""})
                }
                break
            case "firstName":
                if(value.length==0){
                    this.setState({error: "First name field cannot be empty."})
                }
                else
                {
                    this.setState({error: ""})
                }
                break
            case "lastName":
                if(value.length==0){
                    this.setState({error: "Last name field cannot be empty."})
                }
                else
                {
                    this.setState({error: ""})
                }
                break
            case "username":
                if(value.length==0){
                    this.setState({error: "Username field cannot be empty."})
                }
                else
                {
                    this.setState({error: ""})
                }
                break
            case "email":
                if(value.length==0){
                    this.setState({error: "Email field cannot be empty."})
                }
                else
                {
                    this.setState({error: ""})
                }
                break
        }
    }
/*
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
*/
    async handleSubmit (event) {
        var json = this.state;
        console.log(json)
    
        try {
          const response = await fetch(`/api/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
    
          if (response.ok) {
            response.json().then(res => 
                {
                    console.log(res)
                    this.setState({error: '', submitted: true})
                })
          } else {
            // https://github.com/developit/unfetch#caveats
            this.setState({error: "Username is Taken"})
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
        }
      }

    render() {
        var errorMessage= <div></div>
        if(this.state.error)
        {
            errorMessage= <Alert color= 'danger'>{this.state.error}</Alert>
        }

        if(this.state.submitted)
        {
            console.log("Redirecting ...")
            Router.push('/login')
        }
        return (
        <Layout>
            <SimpleTitle>
                <h3>Create a New User</h3>
            </SimpleTitle>
            <div className= "light-container">
            <StyleDiv>
                <Form style={{paddingLeft: "20%", paddingRight:"20%"}}>
                    {errorMessage}
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                    </Row>
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
                        <Label for="password">
                            Password
                            (Note: Please use a unique password that you don't
                            typically use for other purposes.) 
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input
                            type="number"
                            id="year"
                            value={this.state.year}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <div className="center-row" id="submit">
                        <Button id="submit" onClick={this.handleSubmit} disabled={this.state.error}>
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
  
  export default Register;