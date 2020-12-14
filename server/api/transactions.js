const router = require('express').Router()
const {Transaction, Budget, Category} = require('../db/models')
module.exports = router

// GET: transactions/
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const transactions = await Transaction.findAll({
      where: {
        userId: userId,
      },
      include: Category,
      order: [['date', 'DESC']],
    })
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// POST: transactions/
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const transactionInfo = {...req.body, userId}

    const {categoryId, amount} = transactionInfo
    const newTransaction = await Transaction.create(transactionInfo)
    const budget = await Budget.findOne({
      where: {
        userId,
        categoryId,
      },
    })
    if (budget) {
      await budget.update({
        spent: Number(budget.spent) + Number(amount),
      })
    }
    res.json(newTransaction)
  } catch (error) {
    next(error)
  }
})

// DELETE: transactions/:transactionId
router.delete('/:transactionId', (req, res, next) => {
  try {
    Transaction.destroy({
      where: {
        id: req.params.transactionId,
      },
    })
    res.json({
      id: req.params.transactionId,
      message: 'deleted',
    })
  } catch (error) {
    next(error)
  }
})

// PUT: transactions/:transactionId
router.put('/:transactionId', async (req, res, next) => {
  try {
    const updatedTransaction = await Transaction.findByPk(
      req.params.transactionId
    )
    await updatedTransaction.update(req.body)
    res.json(updatedTransaction)
  } catch (error) {
    next(error)
  }
})

module.exports = router
