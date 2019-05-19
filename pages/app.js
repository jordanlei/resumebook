import React, {Component} from 'react'
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, 
  Media, Button} from 'reactstrap'
import StyleDiv from './components/StyleDiv'
import Layout from './components/Layout'
import SimpleTitle from './components/SimpleTitle'
import Batman from './batman'
import fetch from 'isomorphic-unfetch'
import './css/index.css'

class App extends Component{
    render() {
        return (
            <Layout>
              <SimpleTitle>
                <h1>Welcome to Version 9</h1>
              </SimpleTitle>
              <div className= "light-container">
                <StyleDiv> 
                    <Card>
                        <CardHeader>
                          <h4>
                            Batman TV
                          </h4>
                        </CardHeader>
                        <CardBody style= {{padding: "5%"}}>
                          <h4>A Compiled List of Batman Shows</h4>
                          <h5>A referenced list of Batman Shows from tvmaze api.</h5>
                          <Button href= "../batman">Batman</Button>
                        </CardBody>
                    </Card>
                </StyleDiv>
              </div>
            </Layout>
          )
    }
}

export default App
