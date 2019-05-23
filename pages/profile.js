import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import UserLayout from './components/UserLayout'
import SimpleTitle from './components/SimpleTitle';
import { Spinner, Button, Row, Col} from 'reactstrap';
import StyleDiv from './components/StyleDiv'
import { withAuthSync } from './utils/auth'
import { Component } from 'react'
import { logout } from './utils/auth'
import Loading from './components/Loading';
import DashboardMenu from './dashboard/dashboard-menu';
import './css/dashboard.css'
import WelcomePanel from './dashboard/welcome-panel';
import ProfilePanel from './dashboard/profile-panel';
import SettingsPanel from './dashboard/settings-panel';

class Profile extends Component{

    constructor (props) {
        super(props)
        this.state = {
            displayProfile: false,  
            displaySettings: false
        }

        //this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.displayPanel = this.displayPanel.bind(this)
        this.renderPanel= this.renderPanel.bind(this)
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

    displayPanel(panelName) {
        
        this.setState({
          displayProfile: false,
          displaySettings: false,
        });
        console.log(panelName)
        this.setState({ [panelName]: true });
    }
    
    renderPanel() {
        if (this.state.displayProfile) {
            return (
                <ProfilePanel data={this.state.data} displayPanel= {this.displayPanel}/>
            );
        } else if (this.state.displaySettings) {
            return (
                <SettingsPanel data={this.state.data} displayPanel= {this.displayPanel}/>
            );
        }
        else{
            return (
                <WelcomePanel data={this.state.data} displayPanel= {this.displayPanel}/>
            );
        }
    }

    render(){
        /*
        if(this.state.data)
        {
            return (
                <div className= 'layout'>
                    <Row>
                        <Col md={2}>
                            <DashboardMenu displayPanel= {this.displayPanel}/>
                        </Col>
                        <Col md={10}>
                            <SimpleTitle type="dark">
                                <h3>Hello, {this.state.data.firstName}!</h3>
                            </SimpleTitle>
                            <div className= "light-container" style= {{height: "500px"}}>
                                <StyleDiv>
                                    <div className= "center-row">
                                        <Button id="logout" onClick={this.handleLogout}>Logout</Button>
                                    </div>                            
                                </StyleDiv>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            )
        }
        */
        if(this.state.data)
        {
            return(
                <div className= "layout">
                    {this.renderPanel()}
                </div>
            )
        }
        else
        {
            return(
                <UserLayout>
                    <Loading/>
                </UserLayout>
            )
        }        
    }
    
}

export default withAuthSync(Profile)