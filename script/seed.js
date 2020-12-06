'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Category, Budget, Transaction} = require('../server/db/models')

const users = [
  {
    firstName: 'Jessica',
    lastName: 'Cotrina',
    email: 'jessi@gmail.com',
    password: '1234',
  },
  {
    firstName: 'Cathy',
    lastName: 'Sun',
    email: 'cathy@gmail.com',
    password: '1234',
  },
  {
    firstName: 'Torrel',
    lastName: 'Jeremiah',
    email: 'torrel@gmail.com',
    password: '1234',
  },
  {
    firstName: 'Yuliya',
    lastName: 'Maroz',
    email: 'yuliya@gmail.com',
    password: '1234',
  },
]

const categories = [
  {
    name: 'Groceries',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/2921/2921829.svg',
  },
  {
    name: 'Mortage',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/1040/1040988.svg',
  },
  {
    name: 'Food & Dining',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/1999/1999067.svg',
  },
  {
    name: 'Home',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/2829/2829733.svg',
  },
  {
    name: 'Utilities',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/270/270644.svg',
  },
  {
    name: 'Entertainment',
    imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/3163/3163508.svg',
  },
]

const budgets = [
  {
    total: 200,
    remaining: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 1,
  },
  {
    total: 1000,
    remaining: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 2,
  },
  {
    total: 100,
    remaining: 80,
    period: 'monthly',
    userId: 1,
    categoryId: 3,
  },
  {
    total: 100,
    remaining: 0,
    period: 'monthly',
    userId: 1,
    categoryId: 4,
  },
  {
    total: 150,
    remaining: 50,
    period: 'monthly',
    userId: 1,
    categoryId: 5,
  },
  {
    total: 75,
    remaining: 75,
    period: 'monthly',
    userId: 1,
    categoryId: 6,
  },
  {
    total: 1000,
    remaining: 960,
    period: 'annual',
    userId: 1,
    categoryId: 2,
  },
  {
    total: 470,
    remaining: 170,
    period: 'annual',
    userId: 2,
    categoryId: 1,
  },
  {
    total: 1800,
    remaining: 1000,
    period: 'annual',
    userId: 1,
    categoryId: 6,
  },
  {
    total: 80,
    remaining: 19,
    period: 'monthly',
    userId: 2,
    categoryId: 5,
  },
]

const transactions = [
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 50,
    storeName: 'New York restaurant',
    userId: 2,
    categoryId: 2,
  },
  {
    amount: 100,
    storeName: 'Target',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 200,
    storeName: 'Home Depot',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 200,
    storeName: 'Staples',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 200,
    storeName: 'BP Gas',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 50,
    storeName: 'Walmart',
    userId: 1,
    categoryId: 2,
  },
]

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await Promise.all(
      users.map((user) => {
        return User.create(user)
      })
    )

    await Promise.all(
      categories.map((category) => {
        return Category.create(category)
      })
    )

    await Promise.all(
      budgets.map((budget) => {
        return Budget.create(budget)
      })
    )

    await Promise.all(
      transactions.map((transaction) => {
        return Transaction.create(transaction)
      })
    )

    console.log(green(`seeded successfully`))
  } catch (err) {
    console.log(red(err))
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
