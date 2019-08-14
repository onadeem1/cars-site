const router = require('express').Router()
const https = require('https')
module.exports = router

const sendNotification = function(data, expressNext, expressRes) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${process.env.ONESIGNAL}`
  }

  const options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers: headers
  }

  const req = https.request(options, function(res) {
    res.on('data', function(returnedData) {
      expressRes.json(JSON.parse(returnedData))
    })
  })

  req.on('error', function(e) {
    expressNext(e)
  })

  req.write(JSON.stringify(data))
  req.end()
}

router.post('/', (req, res, next) => {
  const { headings, subtitle, contents } = req.body
  const segmentsArr = process.env.NODE_ENV === 'production' ? ['All'] : ['test']
  const message = {
    app_id: process.env.ONESIGNAL_APP_ID,
    contents: { en: contents },
    headings: { en: headings },
    subtitle: { en: subtitle },
    included_segments: segmentsArr
  }
  sendNotification(message, next, res)
})
