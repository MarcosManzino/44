const express = require("express");
const { isAdminPrimium} = require("../middlewares/auth.middleware");
const {
    getWithQuerys,
    getProductById,
    addProduct,
    addManyProducts,
    deleteProduct,
    updateProduct, 
    getProductError 
   } = require ('../controller/products.controller');

const {productsUploader,usersUploader} = require('../utils/multer')

const router = new express.Router();
router.use(express.json());   
router.use(express.urlencoded({ extended: true }));

router.get("/", getWithQuerys);
router.get("/:pid", isAdminPrimium, getProductById);  
router.post("/", addProduct);
router.post("/many", isAdminPrimium, addManyProducts);
router.delete("/:pid", deleteProduct); 
router.put("/:id",updateProduct);
router.get("*", getProductError);



// router.post('/upload', productsUploader(), (req,res)=> {
//     console.log(req.body)
//     console.log('#########################')
//     console.log(req.file)
//     res.send({status:'success', payload: req.file})
// })

// router.post('/upload2', usersUploader(), (req,res)=> {
//     console.log(req.body.name)
//     console.log('#########################')
//     console.log(req.files)
//     console.log('111111111111111111111')
//     console.log(req.files.myfile[0].mimetype)
//     res.send({status:'success', payload: req.files})
// })

module.exports = router;
