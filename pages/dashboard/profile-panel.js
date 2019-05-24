import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, 
  Form, FormGroup, Label, Input, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';

class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error: '',
      username: this.props.data.username,
      password: this.props.data.password, 
      firstName: this.props.data.firstName, 
      lastName: this.props.data.lastName, 
      email: this.props.data.email,
      year: this.props.data.year,
      bio: this.props.data.bio, 
      funFact: this.props.data.funFact, 
      submitted: false, 
    }

    this.handleInputChange= this.handleInputChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({
        [name]: value,
        submitted: false
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

  

  async handleSubmit (event) {
    console.log("updating...")

    var json = {
      username: this.state.username,
      password: this.state.password, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email,
      year: this.state.year,
      bio: this.state.bio, 
      funFact: this.state.funFact, 
    };

    console.log(json)

    try {
      const response = await fetch(`/api/updateuser`, {
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
                this.props.updateData(res)
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

    var saveSuccess= <div></div>
    if(this.state.submitted)
    {
        saveSuccess= <Alert color= 'success'>Successfully Updated Profile.</Alert>
    }

    var cardStyle={
      width:"20em", 
      marginTop: "10vh", 
      marginLeft: "5%", 
      marginRight: "5%",
      marginBottom: "10vh",
      backgroundColor: "rgba(255, 255, 255, 0.7)"
    }


    return (
      <div className= "dashboard-container" style= {{backgroundImage: "linear-gradient(rgb(36, 52, 88), rgb(8, 17, 44))"}}>
      <Row>
        <Col md={2}>
          <DashboardMenu dark displayPanel={this.props.displayPanel}/>
        </Col>
        <Col md={6}>
        <Fade duration={3000}>
          <div style= {{color: "rgba(255, 255, 255, 0.7)", paddingTop: "10vh"}}>
          <h2 style= {{textAlign: "center"}}>This is Your Profile.</h2>

          <Form style={{paddingLeft: "5%", paddingRight:"5%", paddingTop: "2em", paddingBottom: "10%"}}>
                    {errorMessage}
                    {saveSuccess}
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
                    <FormGroup>
                        <Label for="year">Bio</Label>
                        <Input
                            style={{minHeight: "10em"}}
                            type="textarea"
                            id="bio"
                            value={this.state.bio}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Fun Fact</Label>
                        <Input
                            style={{minHeight: "10em"}}
                            type="textarea"
                            id="funFact"
                            value={this.state.funFact}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <div className="center-row" id="submit">
                        <Button id="submit" onClick={this.handleSubmit} disabled={this.state.error}>
                                Save
                        </Button>
                    </div>
                    
                </Form>
          </div>
        </Fade>
        </Col>
        <Col md={4}>
          <div style={{position: "fixed", width: "100%", overflowY: "scroll", overflowX:"hidden", height:"100vh"}}>
          <Card style={cardStyle}>
            <div style={{padding: "10%"}}>
            <h4>{this.state.firstName} {this.state.lastName}</h4>
            <h5><b>Class of {this.state.year}</b></h5>
            <p>{this.state.bio}</p>
            </div>
          </Card>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}


export default ProfilePanel;