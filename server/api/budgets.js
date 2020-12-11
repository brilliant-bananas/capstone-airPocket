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

router.put('/:budgetId', async (req, res, next) => {
  try {
    const updatedBudget = await Budget.findByPk(req.params.budgetId)
    const data = {
      total: req.body.amount,
    }
    await updatedBudget.update(data)
    res.send(updatedBudget)
  } catch (error) {
    next(error)
  }
})

// DELETE: budget/:budgetId
router.delete('/:budgetId', async (req, res, next) => {
  try {
    await Budget.destroy({
      where: {
        id: req.params.budgetId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
