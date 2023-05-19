const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const conn = require("../db/conection");
const admin = require('../middleware/admin');
const upload = require("../middleware/uploadImages")
const util = require("util");
const fs = require("fs");

// get all product
router.get('/:warehouseId',async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { warehouseId } = req.params;
        const warehouseCheck = await query("select * from warehouse where id = ?", [warehouseId]);
        let search ="";
        if (req.query.search) {
            search = `AND name LIKE '%${req.query.search}%'`; 
        }

        if (warehouseCheck.length ==  0 ) {
            res.status(404).json({
                errors : [
                    {
                        msg:"warehouse id is not correct",
                    },
                ],
            })
        }else{
            const productList = await query(`select * from product where warehouseId = ? ${search} `, [warehouseId]);
            productList.map(product => {
                product.photo = "http://"+ req.hostname + ":4000/" + product.photo ;
            })
            res.status(200).json(productList)
        }
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
    
}); 

// get spacific product
router.get('/update-product/:productId',async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { productId } = req.params;
        const product = await query("select * from product where id = ? ", [productId]);
        if (!product[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"product not found",
                    },
                ],
            })
        }
        
        const warehouseData = await query(`select * from product where id = ${productId}`);
        res.status(200).json(warehouseData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
            
        }) 
    }
    
}); 

// create product
router.post('/add-product/:warehouseId',upload.single("photo"),
body("name").isString().withMessage("please enter a valid product name").isLength({min:1}).withMessage("product name should be more than 3 characters !"),
body("discription").isString().withMessage("please enter a valid product discription").isLength({min:5}).withMessage("product name should be more than 10 characters !"),
body("stock").isNumeric().withMessage("please enter a valid product stock").isLength({min:1}).withMessage("product stock should be more than 1 number !"),
async (req,res) => {
    try {
            // request validation 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // validate the image 
            if (!req.file) {
                return res.status(404).json({
                    errors : [
                        {
                            msg:"image is reqiered",
                        },
                    ],
                })
            }
            // validate warehouseId
            const query = util.promisify(conn.query).bind(conn); // for multiple query 
            const { warehouseId } = req.params;
            const warehouseCheck = await query("select * from warehouse where id = ?", [warehouseId]);
        
            if (warehouseCheck.length ==  0 ) {
                res.status(404).json({
                    errors : [
                        {
                            msg:"warehouse id is not correct",
                        },
                    ],
                })
            }else {
                // prepair opject user to save it
            const productData ={
                name: req.body.name,
                discription: req.body.discription,
                photo: req.file.filename,
                stock: req.body.stock,
                warehouseId: warehouseId,
            }

            // insert product into db 
            await query("insert into product set ?",productData);

            res.status(200).json({
                msg : "product created successfully",
            })

            }    
            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// update product 
router.put('/update-product/:productId',upload.single("photo"),
body("name").isString().withMessage("please enter a valid product name").isLength({min:3}).withMessage("product name should be more than 3 characters !"),
body("discription").isString().withMessage("please enter a valid product discription").isLength({min:10}).withMessage("product name should be more than 10 characters !"),
body("stock").isNumeric().withMessage("please enter a valid product stock").isLength({min:1}).withMessage("product stock should be more than 1 number !"),
async (req,res) => {
    try {
        // request validation 
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
            // validate warehouseId
        const { productId } = req.params;
        const product = await query("select * from product where id = ?", [productId]);
        if (!product[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"product not found",
                    },
                ],
            })
        }
        // prepair opject product to update it
        const productopj = {
            name: req.body.name,
            discription: req.body.discription,
            stock: req.body.stock,
        }

        if (req.file) {
            productopj.photo =req.file.filename;
            fs.unlinkSync("./upload/"+ product[0].photo )
        }

        // insert product into db 
        await query("update product set ? where id = ?",[productopj ,productId]);

        res.status(200).json({
            msg : "product updated successfully",
        })


            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// delete product
router.delete('/:productId',async (req,res) => {
    try {
        // validate warehouseId
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { productId } = req.params;
        const product = await query("select * from product where id = ?", [productId]);
        if (!product[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"product not found",
                    },
                ],
            })
        }

        // insert product into db 
        fs.unlinkSync("./upload/"+ product[0].photo ) // delete photo from server
        await query("delete from product where id = ?", productId);

        res.status(200).json({
            msg : "product deleted successfully",
        })

            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});




module.exports = router;