const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {Transaction} = require('../db/models')
// // Include dependences
const fs = require('fs')

const upload = multer()

//OCR
const {createWorker} = require('tesseract.js')

// Function for create file static with filename and content.
const saveFile = async file => {
  new Promise((resolve, reject) =>
    fs.writeFile(
      './public/uploads/receipt.png',
      file.buffer,
      err =>
        err
          ? reject('An error occurred: ' + err.message)
          : resolve({uploaded: true})
    )
  )
}

// Endpoint Upload.
router.post('/upload', upload.single('photo'), async (req, res, next) => {
  // Control for get file on request.
  if (!req.file) res.sendStatus(400, 'Cannot find file on request')

  // Try create local file with content.
  try {
    await saveFile(req.file)

    const worker = createWorker({
      langPath: path.join('./server', 'lang-data'),
      logger: m => console.log(m)
    })
    ;(async () => {
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const {data: {text}} = await worker.recognize(
        path.join('./public/uploads', 'receipt.png')
      )

      //getting total and name of the place
      const data = `${text}`

      if (data == undefined || data.length <= 0) {
        res.sendStatus(400, 'ERROR: Could not read receipt!')
      }

      let splitData = data.split(/\n/)

      // Getting Store name from receipt
      const storeNameRegex = RegExp('^[a-zA-Zsd]+')
      let storeName = ''
      if (storeNameRegex.test(splitData[0])) {
        storeName = splitData[0]
      }

      const total = splitData.find(element => /tot?al/i.test(element))

      let amount = 0
      if (total) {
        const totalData = total.split(' ')
        if (totalData) {
          const price = totalData.find(
            element => element[0] === '$' || element[0] === 's'
          )
          if (price) {
            amount = Number(price.slice(1))
          } else {
            amount = Number(
              totalData.find(
                element =>
                  isNaN(Number(element)) === false && Number(element) !== 0
              )
            )
          }
        } else {
          amount = 0
        }
      }

      await worker.terminate()

      if (storeName !== '' && amount > 0) {
        console.log('Store name:', storeName)
        console.log('amount', amount)
        const newTransaction = await Transaction.create({
          amount,
          storeName
        })
        res.send(newTransaction)
      } else {
        res.sendStatus(400, 'Could not read data from receipt!')
      }
    })()
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
