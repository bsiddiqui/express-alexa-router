'use strict'

let lab = exports.lab = require('lab').script()
let expect = require('code').expect
let express = require('express')
let bodyParser = require('body-parser')
let supertest = require('supertest')

let expressAlexaRouter = require('../')
let fixtures = require('alexa-router/test/fixtures')

lab.describe('general', () => {
  lab.test('should throw when no alexa instance', (cb) => {
    expect(() => expressAlexaRouter()).to.throw('You must provide an alexa-router instance')
    cb()
  })

  lab.test('should work', (cb) => {
    let app = express()
    app.use(bodyParser.json())
    app.use('/alexa/incoming', expressAlexaRouter(fixtures.simpleRouting()))

    supertest(app)
    .post('/alexa/incoming')
    .send(fixtures.HELLO_WORLD_REQUEST)
    .end((err, res) => {
      expect(err).to.not.exist()
      expect(res.status).to.equal(200)
      expect(res.body.response.outputSpeech.text).to.equal('Hello world!')
      cb()
    })
  })

  lab.test('should call next if not a post', (cb) => {
    let app = express()
    app.use(bodyParser.json())
    app.use('/alexa/incoming', expressAlexaRouter(fixtures.simpleRouting()))

    supertest(app)
    .get('/alexa/incoming')
    .end((err, res) => {
      expect(err).to.not.exist()
      expect(res.status).to.equal(404)
      cb()
    })
  })
})
