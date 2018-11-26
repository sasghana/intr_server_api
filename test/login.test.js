'use strict'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

chai.use(chaiHttp)

const beautify = require("json-beautify")
const expect = chai.expect

describe('Login Controller Test', () => {

  // it('[SignUp]', (done) => {

  //   chai.request(server)
  //     .post('/api/signup')
  //     .send({
  //       email: 'jbatty@yopmail.com',
  //       displayName: 'Juan Manuel Batty Linero',
  //       password: '12345',
  //       providerId: 'email.com',
  //       avatar: 'https://avatars2.githubusercontent.com/u/228746423',
  //       username: 'jbatty'
  //     })
  //     .end((err, res) => {

  //       if (err) done(err)
  //       expect(res).to.have.status(200)
  //       done()

  //     })
  // })

  it('[SignIn]', (done) => {

    chai.request(server)
      .post('/api/signin')
      .send({
        account: 'jmbl1685',
        password: '12345'
      })
      .end((err, res) => {

        if (err) done(err)
        expect(res).to.have.status(200)
        expect(res.body).to.property('token')
        expect(res.body).to.property('user')
        expect(res.body).to.property('status')
        done()

      })

  })

})