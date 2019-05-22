var express = require('express');
require('dotenv').config();
const { json, send, createError, run } = require('micro')
const fetch = require('isomorphic-unfetch')

const login = async (req, res) => {
  console.log(req.body.username)
  const { username } = req.body.username
  const url = `https://api.github.com/users/${username}`
  try {
    const response = await fetch(url)
    console.log("GOTHERE2")
    if (response.ok) {
      const { id } = await response.json()
      console.log(id)
      send(res, 200, { token: id })
    } else {
      send(res, response.status, response.statusText)
    }
  } catch (error) {
    throw createError(error.statusCode, error.statusText)
  }
}

module.exports = (req, res) => run(req, res, login);