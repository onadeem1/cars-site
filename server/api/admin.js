const router = require('express').Router()
const { Admin } = require('../../database/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } })
    if (!admin) {
      console.log('No such admin found:', req.body.email)
      res.status(401).send('Wrong admin name and/or password')
    } else if (!admin.correctPassword(req.body.password)) {
      console.log('Incorrect password for admin:', req.body.email)
      res.status(401).send('Wrong admin name and/or password')
    } else {
      req.login(admin, err => (err ? next(err) : res.json(admin)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const admin = await Admin.create(req.body)
    req.login(admin, err => (err ? next(err) : res.json(admin)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Admin already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
