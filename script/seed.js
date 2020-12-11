'use strict'
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
    spent: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 1,
  },
  {
    total: 1000,
    spent: 800,
    period: 'monthly',
    userId: 1,
    categoryId: 2,
  },
  {
    total: 100,
    spent: 20,
    period: 'monthly',
    userId: 1,
    categoryId: 3,
  },
  {
    total: 100,
    spent: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 4,
  },
  {
    total: 150,
    spent: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 5,
  },
  {
    total: 75,
    spent: 100,
    period: 'monthly',
    userId: 1,
    categoryId: 6,
  },
  {
    total: 470,
    spent: 300,
    period: 'monthly',
    userId: 2,
    categoryId: 1,
  },
  {
    total: 80,
    spent: 61,
    period: 'monthly',
    userId: 2,
    categoryId: 5,
  },
]
const transactions = [
  {
    amount: 50,
    storeName: 'Walmart',
    date: '2020-12-15',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 30,
    storeName: 'New York restaurant',
    date: '2020-12-01',
    userId: 2,
    categoryId: 2,
  },
  {
    amount: 52,
    storeName: 'Target',
    date: '2020-12-11',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 14,
    storeName: 'Home Depot',
    date: '2020-12-05',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 89,
    storeName: 'Staples',
    date: '2020-12-01',
    userId: 1,
    categoryId: 1,
  },
  {
    amount: 67,
    storeName: 'BP Gas',
    date: '2020-12-13',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 31.5,
    storeName: 'Whole Foods',
    date: '2020-12-02',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 49,
    storeName: 'Walmart',
    date: '2020-11-12',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 78,
    storeName: 'Walmart',
    date: '2020-11-16',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 69,
    storeName: 'Kroger',
    date: '2020-11-20',
    userId: 1,
    categoryId: 2,
  },
  {
    amount: 30,
    storeName: 'PG&E',
    date: '2020-11-17',
    userId: 2,
    categoryId: 5,
  },
  {
    amount: 15,
    storeName: 'Safeway',
    date: '2020-12-03',
    userId: 2,
    categoryId: 1,
  },
  {
    amount: 75,
    storeName: 'One of a Kind Studio',
    date: '2020-11-25',
    userId: 2,
    categoryId: 6,
  },
  {
    amount: 65,
    storeName: 'Healthy Treats',
    date: '2020-11-16',
    userId: 2,
    categoryId: 5,
  },
  {
    amount: 42,
    storeName: 'Sweet Spot',
    date: '2020-11-21',
    userId: 2,
    categoryId: 2,
  },
  {
    amount: 74,
    storeName: 'Decorama Boutique',
    date: '2020-12-11',
    userId: 1,
    categoryId: 3,
  },
  {
    amount: 70,
    storeName: 'Farm to Shelf',
    date: '2020-11-10',
    userId: 1,
    categoryId: 4,
  },
  {
    amount: 40,
    storeName: 'Spice Heaven',
    date: '2019-11-20',
    userId: 1,
    categoryId: 3,
  },
  {
    amount: 18,
    storeName: 'Plentiful Online',
    date: '2020-12-09',
    userId: 2,
    categoryId: 4,
  },
  {
    amount: 62,
    storeName: 'Not Just Groceries',
    date: '2020-11-10',
    userId: 1,
    categoryId: 5,
  },
  {
    amount: 79,
    storeName: 'The Full Cart',
    date: '2020-12-09',
    userId: 2,
    categoryId: 6,
  },
  {
    amount: 88,
    storeName: 'Etsy',
    date: '2020-11-11',
    userId: 2,
    categoryId: 4,
  },
  {
    amount: 73,
    storeName: 'WholeSome',
    date: '2020-11-14',
    userId: 1,
    categoryId: 6,
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
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
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
