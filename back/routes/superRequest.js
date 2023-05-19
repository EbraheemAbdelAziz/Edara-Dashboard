const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const conn = require("../db/conection");
const util = require("util");


// get all request for spacific supervisor 
router.get('/',async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const {token} = req.headers ;        
        const requestData = await query(
            `select user.id as supervisorId,user.email,product.id as productId,product.name as productName ,product.stock as oldStock ,product.warehouseId ,request.id as requestId ,request.amount as newStock , request.status
            from request join user 
            on request.supervisorId = user.id 
            join product 
            on product.id = request.productId
            where user.token = '${token}' `);
        res.status(200).json(requestData)   
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
}); 

// add new request
router.post('/add-request',
body("amount").isNumeric().withMessage("please enter a valid stock").isLength({min:1}).withMessage("product stock should be more than 1 number !"),
body("productId").isNumeric().withMessage("please enter a valid supervisor"),
async (req,res) => {
    try {
            // request validation 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // validate supervisor name 
            const {token} = req.headers ;        
            const query = util.promisify(conn.query).bind(conn); // for multiple query 
            const supervisorCheck = await query("select * from user where token = ?", [token]);
            if (supervisorCheck.length ==  0 ) {
                res.status(404).json({
                    errors : [
                        {
                            msg:"supervisor is not correct",
                        },
                    ],
                })
            }

            const productCheck = await query("select * from product where id = ? ", [req.body.productId]);
            if (productCheck.length ==  0 ) {
                res.status(404).json({
                    errors : [
                        {
                            msg:"product id is not correct",
                        },
                    ],
                })
            }
                // prepair opject request to save it
            const requestData ={
                amount: req.body.amount,
                productId: req.body.productId,
                supervisorId: supervisorCheck[0].id
            }

            // insert request into db 
            await query("insert into request set ?",requestData);
            res.status(200).json({
            msg : "request added successfully",
            })

            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});



module.exports = router;