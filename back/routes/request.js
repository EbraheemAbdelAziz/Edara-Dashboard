const router = require('express').Router();
const conn = require("../db/conection");
const admin = require('../middleware/admin');
const util = require("util");

//get all wating requests 
router.get('/',admin,async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const requestData = await query(
            `select user.id as supervisorId,user.email,product.id as productId,product.name as productName ,product.stock as oldStock ,product.warehouseId ,request.id as requestId ,request.amount as newStock , request.status
            from request join user 
            on request.supervisorId = user.id 
            join product 
            on product.id = request.productId
            where request.status = 2 `);
        res.status(200).json(requestData)
    } catch (err){
        res.status(500).json({
            err : err,
        }) 
    }
}); 

//get all history requests 
router.get('/history',admin,async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const requestData = await query(
            `select user.id as supervisorId,user.email,product.id as productId,product.name as productName ,product.stock as newStock ,product.warehouseId ,request.id as requestId ,request.amount as requestStock, request.status
            from request join user 
            on request.supervisorId = user.id 
            join product 
            on product.id = request.productId
            where request.status = 0 or request.status = 1  `);
        res.status(200).json(requestData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
    
}); 

// accept or decline request 
router.put('/:requestId',
async (req,res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        // validate requestId
        const { requestId  } = req.params;
        const status = req.body.status ;
        

        const request = await query("select * from request where id = ? AND status = 2", [requestId]);
        if (!request[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"request not found",
                    },
                ],
            })
        }
        const product = await query("select * from product where id = ?",[request[0].productId])
        if (status == 1) {
            // update request and product stock into db 
            let newStock=request[0].amount+product[0].stock;
            
            await query("update request set status = 1 where id = ?",[requestId]);
            await query("update product set stock = ? where id = ?",[newStock,request[0].productId]);
            res.status(200).json({
            msg : "request are accepted",
        })
        }else if (status == 2) {
            await query("update request set status = 0 where id = ?",[requestId]);
            res.status(200).json({
            msg : "request are declined",
        })
        }else {
            res.status(404).json({
                errors : [
                    {
                        msg:"error in status number",
                    },
                ],
            })
        }

        

            
    } catch (err) {
        res.status(500).json({
            err : err,
    })
}
});


//get spesifc request
router.get('/:requestId',
async (req,res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        // validate requestId
        const { requestId ,status } = req.params;
        const request = await query("select * from request where id = ? ", [requestId]);
        if (!request[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"request not found",
                    },
                ],
            })
        }
        const requstt = await query(`select * from request where id = ${requestId}`);
        res.status(200).json(requstt)
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});



module.exports = router;