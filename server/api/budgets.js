const router = require('express').Router()
const {Budget} = require('../db/models')
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('REQ Budget', req)
    const budgets = await Budget.findAll({
      include: Category,
      where: {
        userId: req.user.userId
      }
    })

    res.json(budgets)
  } catch (err) {
    next(err)
  }
})
