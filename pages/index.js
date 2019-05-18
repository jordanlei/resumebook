import React from 'react'
import {Card} from 'reactstrap'
import Link from 'next/link'
import Layout from './components/Layout'
import Batman from './batman'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <Card style={{padding: 10+"%"}}>
      <h1>Hello, World! This is version 4.</h1>
    </Card>
    <Batman/>
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
