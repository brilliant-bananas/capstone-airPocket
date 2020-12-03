const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

// GET: transactions/
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll()
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// POST: transactions/
router.post('/', async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body)
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
        id: req.params.transactionId
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST: transactions/:transactionId
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
