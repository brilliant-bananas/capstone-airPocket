const router = require('express').Router()
const {Transaction, Budget} = require('../db/models')
const Category = require('../db/models/category')
module.exports = router

// GET: transactions/
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const transactions = await Transaction.findAll(
      {include: Category},
      {order: [['date', 'DESC']]},
      {
        where: {
          userId: userId,
        },
      }
    )
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// GET: transactions/:transactionId
router.get('/:transactionId', async (req, res, next) => {
  try {
    const {transactionId} = req.params
    const transaction = await Transaction.findByPk(transactionId, {
      include: {model: Category, include: [Transaction]},
    })
    res.json(transaction)
  } catch (error) {
    next(error)
  }
})

// POST: transactions/
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log('post new transaction res.body-->', req.body)
    const transactionInfo = {...req.body, userId}
    const {categoryId, amount} = transactionInfo
    const newTransaction = await Transaction.create(transactionInfo)
    const budget = await Budget.findOne({
      where: {
        userId,
        categoryId,
      },
    })
    console.log('budget of this category-->', budget)
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
    console.log('api deleteId', req.params.transactionId)
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
    console.log('update req.body-->', req.body)
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
