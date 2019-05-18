import React, {Component} from 'react'
import {Card, CardDeck, CardHeader} from 'reactstrap'
import Link from 'next/link'
import Layout from './components/Layout'
import SimpleTitle from './components/SimpleTitle'
import StyleDiv from './components/StyleDiv'
import fetch from 'isomorphic-unfetch'
import { inspect } from 'util'

class Batman extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: null,
    };
  }

  componentDidMount() {
    fetch('https://api.tvmaze.com/search/shows?q=batman')
      .then(response => response.json())
      .then(data => (data.map(entry=>entry.show)))
      .then(map => this.setState({shows: map}))
  }

  render() {
    var batmanlist= <p>Sorry, it appears the code monkey made a mistake... error loading content.</p>
    
    if(this.state.shows)
    {
      var showlist= this.state.shows
      batmanlist= this.state.shows.map(show => (
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
          <Card className= "hover-card" style= {{marginBottom: "2%"}}>
            <CardHeader>
              <h4>{show.name}</h4>
            </CardHeader>
            <div style={{textAlign: "center"}}>
              <h5><a>{show.name}</a></h5>
            </div>
          </Card>
        </Link>
        
      ))
    }
    
    var batmancards= [];
    var length= batmanlist.length/3
    for(var i= 0; i<= length; i++)
    {
      var removed = batmanlist.splice(0, 3)
      batmancards.push(
        <CardDeck>
          {removed}
        </CardDeck>
      )
    }

    return (
      <Layout>
        <SimpleTitle>
          <h1>List of Batman Shows</h1>
        </SimpleTitle>
        <div className= "light-container">
          {batmancards}
        </div>
      </Layout>
    )
  }
}

export default Batman;