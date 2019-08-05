/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Admin = db.model('admin')

describe('Admin model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let zain

      beforeEach(async () => {
        zain = await Admin.create({
          email: 'cars@arecool.com',
          password: 'wishlist'
        })
      })

      it('returns true if the password is correct', () => {
        expect(zain.correctPassword('wishlist')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(zain.correctPassword('wishlistz')).to.be.equal(false)
      })
    })
  })
})
