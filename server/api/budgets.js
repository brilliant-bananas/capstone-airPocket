const router = require('express').Router()
const {Budget, Category, User} = require('../db/models')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll({
      include: Category,
      where: {
        userId: req.params.userId,
        // period: req.query.period,
      },
    })
    res.json(budgets)
  } catch (err) {
    next(err)
  }
})

//GET /api/budgets
router.get("/", async (req, res, next) => {
  try {
     const allBudgets = await Budget.findAll();
     res.send(allBudgets) 
  } catch (error) {
    next(error)
  }
})

//GET /api/budgets/:budgetId
router.get('/:budgetId', async (req, res, next) => {
  try {
    const budget = await Budget.findByPk(req.params.budgetId, {
      include: Category,
      include: User,
    })
    res.send(budget)
  } catch (error) {
    next(error)
  }
})

//POST /api/budgets
router.post('/', async (req, res, next) => {
  try {
    const { total, userId, categoryId } = req.body
    console.log('req.body', req.body)
    const newBudget = await Budget.create({
      total,
      userId,
      categoryId,
    })
    res.send(newBudget)
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
