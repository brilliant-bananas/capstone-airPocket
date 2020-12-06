const router = require('express').Router()
const {Transaction} = require('../db/models')
const Category = require('../db/models/category')
module.exports = router

// GET: transactions/
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const transactions = await Transaction.findAll({
      where: {
        userId: userId,
      },
    })
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

// DELETE: transactions/:transactionId
router.delete('/:transactionId', (req, res, next) => {
  try {
    Transaction.destroy({
      where: {
        id: req.params.transactionId,
      },
    })
  } catch (error) {
    next(error)
  }
})

// PUT: transactions/:transactionId
router.put('/:transactionId', async (req, res, next) => {
  try {
    debugger
    console.log('req.body-->', req.body)
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
