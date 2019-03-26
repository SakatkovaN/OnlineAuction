const express = require('express')
const router = express.Router()

const { Product } = require('../models/product')
const { authenticateUser } = require('../middlewares/authenticate')




router.get('/', authenticateUser, (req, res) => {
    Product.find({ sellerId: req.user._id })
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req, res) => {
    const body = req.body
    body.sellerId = req.user._id

    const product = new Product(body)
    product.save()
        .then((product) => {
            res.send(product)

        })
        .catch((err) => {
            res.send(err)
        })

})


router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then((product) => {
            if (product) {
                res.send(product)
            }
            else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})



router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then((product) => {
            if (product) {
                res.send(product)
            }
            else {
                res.send({})
            }

        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, (req, res) => {
    const _id = req.params.id
    const data = req.body
    Product.findByIdAndUpdate({ _id }, { $set: data })
        .then((product) => {
            if (product) {
                res.send(product)
            }
            else {
                res.send(product)
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    productsRouter: router
}