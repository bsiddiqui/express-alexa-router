'use strict'

function setup (alexa) {
  if (typeof alexa !== 'object') {
    throw new Error('You must provide an alexa-router instance')
  }

  return (req, res, next) => {
    if (req.method !== 'POST') {
      next()
    } else {
      alexa.dispatch(req.body, req.headers)
      .then(result => { res.json(result) }, next)
    }
  }
}

module.exports = setup
