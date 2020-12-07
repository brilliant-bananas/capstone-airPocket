const router = require('express').Router()
const { Budget, Category, User } = require('../db/models')

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


//GET /api/budgets/:budgetId
router.get("/:budgetId", async (req, res, next) => {
  try {
     const budget = await Budget.findByPk(req.params.budgetId, {
       include: Category,
       include: User,
    })
    res.send(budget)
  } catch(error) {
    next(error);
  }
})

//POST /api/budgets
router.post("/", async (req, res, next) => {
  try {
    const { total, period, userId, categoryId } = req.body
    const newBudget = await Budget.create({
      total,
      period,
      userId,
      categoryId,
   })
    res.send(newBudget)
  }catch (error) {
    next(error);
  }
})

//DELETE /api/budgets/:budgetId
router.delete("/:budgetId", async (req, res, next) => {
   const budgetId = req.params.budgetId
   try {
     const budgetToDelete = await Budget.findByPk(budgetId)
     if(!budgetToDelete) {
       res.sendStatus(404)
     } else {
       await budgetToDelete.destroy();
       res.sendStatus(204);
    }
  } catch (error) {
    next(error);
 }  
})

//PUT /api/budgets/:studentId
router.put("/:budgetId", async (res, req, next) => {
   try {
     const { total, period, userId, categoryId } = req.body;
     const budget = await Budget.findByPk(req.params.budgetId)
     if (!budget) {
       res.sendStatus(404)
     } else {
       const updatedBudget = await budget.update({
         total,
         period,
         userId,
         categoryId,
       })
       res.send(updatedBudget)
     }
   } catch (error) {
     next(error)
  }
})