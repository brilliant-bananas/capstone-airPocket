const router = require('express').Router()
const {Budget} = require('../db/models')
const {Category} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll({
      include: Category,
      where: {
        userId: req.params.userId,
        period: req.query.period,
      },
    })

    res.json(budgets)
  } catch (err) {
    next(err)
  }
})
