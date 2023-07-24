const express = require('express');
const router = express.Router();
const admin=require('../controllers/admin');
const isAuth=require('../middleware/is-auth');

// you can add as many args as u want, request will travel from left to right
router.post('/add-product',isAuth,admin.postAddProduct);

router.post('/edit-product',isAuth,admin.postEditProduct);

router.delete('/delete-product/:id',isAuth,admin.deleteProduct);
router.delete('/delete-cart',isAuth,admin.deleteFromCart);

router.post('/post-order',isAuth,admin.postOrder);

module.exports=router;