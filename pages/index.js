import React from 'react'
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button} from 'reactstrap'
import StyleDiv from './components/StyleDiv'
import Layout from './components/Layout'
import SimpleTitle from './components/SimpleTitle'
import Batman from './batman'
import fetch from 'isomorphic-unfetch'
import './css/index.css'

const Index = (props) => (
  <Layout>
    <SimpleTitle>
      <h1>Welcome to Version 6</h1>
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

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.log("hello world")
  return {
    shows: data.map(entry => entry.show)
  }
}

export default Index
