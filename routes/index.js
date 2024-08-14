const express = require('express')
const createUser = require('../controller/signup')
const verifyUser = require('../controller/confirmEmail')
const signIn = require('../controller/signin')
const getUser = require('../controller/getUser')
const updateUserAttributes = require('../controller/update')
// const authMiddleware = require('../middleware/token')
const getUserBySub = require('../controller/getBySub')
const listUsersByType = require('../controller/listByType')

const route = express.Router()

route.get('/', async( req, res) => {
  try {
    const user = await getUser(req.headers.authorization)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.get('/:sub', async(req, res) => {
  try {
    const user = await getUserBySub(req.params.sub)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.get('/list/:type', async(req, res) => {
  try {
    const users = await listUsersByType(req.params.type)
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.put('/update', async(req, res) => {
  try {
    const body = req.body
    if (!body) {
      return res.status(400).json({ error: 'No attributes to update' })
    }

    if (body.payment_gateway) {
      body.payment_gateway = JSON.stringify(body.payment_gateway)
    }
    if (body.services) {
      body.services = JSON.stringify(body.services)
    }
    if (body.company_name) {
      body.company_name = JSON.stringify(body.company_name)
    }

    console.log(body)

    const updatedUser = await updateUserAttributes(req.headers.authorization, req.body)
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.post('/signup', async(req, res) => {
  try {
    const { 
      email, password, name, companyName, doc, type, paymentGateway, services 
    } = req.body
    console.log(email, password, name, companyName, doc, type, paymentGateway, services)
    const user = await createUser(
      email, 
      password, 
      name, 
      companyName,
      doc,
      type,
      paymentGateway,
      services
    )

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.post('/signin', async(req, res) => {
  try {
    const { email, password } = req.body
    const user = await signIn(email, password)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

route.post('/verifyToken', async(req, res) => {
  try {
    const { token, email } = req.body
    const user = await verifyUser(email, token)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

module.exports = route