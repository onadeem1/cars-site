/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../../database')
const app = require('../../index')
const Admin = db.model('admin')

const omer = {
  email: 'omer@aol.com',
  password: 'helloworld'
}

describe('Admin routes', () => {
  beforeEach('clear the tables', () => {
    return db.sync({ force: true })
  })

  beforeEach('create a user', () =>
    Admin.create({
      email: omer.email,
      password: omer.password
    })
  )

  describe('POST /api/admin/', () => {
    it('succeeds with a valid username and password', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send(omer)
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(omer.email)
    })

    it('fails with an invalid username and password', async () => {
      await request(app)
        .post('/api/admin/login')
        .send({ email: omer.email, password: 'wrong' })
        .expect(401)
    })
  })

  describe('GET /api/admin/me', () => {
    describe('when not logged in', () => {
      it('responds empty when not logged in', async () => {
        const res = await request(app)
          .get('/api/admin/me')
          .expect(200)
        expect(res.body).to.be.equal('')
      })
    })

    describe('when logged in', () => {
      const agent = request.agent(app)

      beforeEach('log in', () => agent.post('/api/admin/login').send(omer))
      it('responds with currently logged in admin', async () => {
        const res = await agent.get('/api/admin/me').expect(200)
        expect(res.body).to.contain({ email: omer.email })
      })
    })
  })
})
