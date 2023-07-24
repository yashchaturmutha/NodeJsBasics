const express = require('express');
const router = express.Router();
const shop=require('../controllers/shop');
const isAuth=require('../middleware/is-auth');

router.get('/product-detail/:id',isAuth,shop.getProductById);
router.get('/get-product',isAuth,shop.getProduct);

router.post('/cart',isAuth,shop.postCart);
router.get('/get-cart',isAuth,shop.getCart);

router.get('/orders',isAuth,shop.getOrders);

router.post('/createpdf',shop.createPdf);
router.post('/download',shop.downloadFile);

module.exports=router;