import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleTitle from './components/SimpleTitle';
import { Form, FormGroup, Label, Input, Button, Alert, FormText, Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';
import { login } from './utils/auth'

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
    username: '',
    password: '',
    error: '',
    submitted: false
    };

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({
        [name]: value,
    });
    }

  async handleSubmit (event) {
    event.preventDefault()
    const username = this.state.username
    console.log("Submitted ..."+ JSON.stringify({username}))

    try {
      const response = await fetch('/api/finduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      if (response.ok) {
        response.json().then(res => 
            {
                if(res.password== this.state.password)
                {
                    const token= this.state.username
                    console.log("Signing in")
                    login(token)
                }
                else
                {
                    this.setState({error: "Incorrect Username or Password"})
                }
            })
      } else {
        // https://github.com/developit/unfetch#caveats
        this.setState({error: "Incorrect Username or Password"})
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }
  }

  render () {
    var errorMessage= <div></div>
    if(this.state.error)
    {
        errorMessage= <Alert color='danger'>{this.state.error}</Alert>
    }

    return (
        <Layout>
        <SimpleTitle>
            <h3>Sign In Existing User</h3>
        </SimpleTitle>
        <div className= "light-container" style={{height: "60vh"}}>
        <StyleDiv>
            <Form style={{paddingLeft: "20%", paddingRight:"20%"}}>
                {errorMessage}
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

                <div className="center-row" id="submit">
                    <Button id="submit" onClick={this.handleSubmit}>
                            Submit
                    </Button>
                </div>
            </Form>
        </StyleDiv>
        </div>
        </Layout>
    )
  }
}

export default Login