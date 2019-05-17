import React from 'react'
import {Card} from 'reactstrap'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = (props) => (
  <Layout>
    <Card>
      <ul>
      <h3>Hello, World! This is version 2.</h3>
      <li><Link href='/b' as='/a'><a>a</a></Link></li>
      <li><Link href='/a' as='/b'><a>b</a></Link></li>
      </ul>
    </Card>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry.show)
  }
}

export default Index