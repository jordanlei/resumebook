import React from 'react'
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button} from 'reactstrap'
import StyleDiv from './components/StyleDiv'
import Layout from './components/Layout'
import Batman from './batman'
import fetch from 'isomorphic-unfetch'
import './css/index.css'

const headerStyle= {
  textAlign: 'center', 
  height: 300 + 'px',
  backgroundImage: 'linear-gradient(rgb(194, 202, 221), rgb(171, 178, 197), #8090B8)',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

const spanStyle= {
  paddingTop: 5 + "%"
}

const Index = (props) => (
  <Layout>
    <div style={headerStyle}>
      <div style={spanStyle}>
        <h1>Hello, World!</h1>
      </div>
    </div>
    <StyleDiv>
      <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardTitle>Hello World</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
      </Card>
      <Batman/>
    </StyleDiv>
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
