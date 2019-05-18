import React, {Component} from 'react'
import {Card} from 'reactstrap'
import Link from 'next/link'
import Layout from './components/Layout'
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
        batmanlist= this.state.shows.map(show => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))
    }

    return (
      <div>
      <h1>List of Batman Shows</h1>
      <ul>
        {batmanlist}
      </ul>
      </div>
    )
  }
}

export default Batman;