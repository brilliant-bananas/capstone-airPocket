const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

// GET: categories/
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

// POST: categories/
router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
  } catch (error) {
    next(error)
  }
})

// DELETE: categories/:categiryId
router.delete('/:categoryId', (req, res, next) => {
  try {
    Category.destroy({
      where: {
        id: req.params.categoryId,
      },
    })
  } catch (error) {
    next(error)
  }
})

// PUT: categories/:categoryId
router.put('/:categoryId', async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByPk(req.params.categoryId)
    await updatedCategory.update(req.body)
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
})

module.exports = router
