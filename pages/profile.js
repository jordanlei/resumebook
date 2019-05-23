import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from './components/Layout'
import SimpleTitle from './components/SimpleTitle';
import { Form, FormGroup, Label, Input, Button, FormText, Row, Col } from 'reactstrap';
import StyleDiv from './components/StyleDiv'
import { withAuthSync } from './utils/auth'
import { Component } from 'react'
import { logout } from './utils/auth'

class Profile extends Component{

    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        //this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        fetch('/api/finduser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.props.token })})
          .then(response => response.json())
          .then(data => this.setState({data}))
    }

    async handleLogout(event){
        logout()
    }

    

    render(){
        if(this.state.data)
        {
            return (
                <Layout>
                    <SimpleTitle>
                        <h3>Hello, {this.state.data.firstName}!</h3>
                    </SimpleTitle>
                    <div className= "light-container" style= {{height: "500px"}}>
                    <StyleDiv>
                        <div className= "center-row">
                            <Button id="logout" onClick={this.handleLogout}>Logout</Button>
                        </div>                            
                    </StyleDiv>
                    </div>
                </Layout>
                
            )
        }
        else
        {
            return(
                <Layout>
                    <SimpleTitle>
                        <h3>Please wait... </h3>
                    </SimpleTitle>
                </Layout>
            )
        }        
    }
    
}

export default withAuthSync(Profile)