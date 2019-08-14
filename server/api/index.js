const router = require('express').Router()
module.exports = router

router.use('/cars', require('./cars'))
router.use('/admin', require('./admin'))
router.use('/notifications', require('./notifications'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
