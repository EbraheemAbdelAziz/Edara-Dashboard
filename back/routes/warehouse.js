const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const conn = require("../db/conection");
const admin = require('../middleware/admin');
const util = require("util");

//get all warehouses
router.get('/',async (req, res) => {
    try {
        let search ="";
        if (req.query.search) {
            search = `where name LIKE  '%${req.query.search}%'`; 
        }
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const warehousesData = await query(`select warehouse.id, warehouse.name , warehouse.location , warehouse.status ,warehouse.supervisorId, user.email from warehouse join user on warehouse.supervisorId = user.id`);
        res.status(200).json(warehousesData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }  
}); 

// get spacific warehouse
router.get('/:warehouseId',async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { warehouseId } = req.params;
        const warehouse = await query("select * from warehouse where id = ? ", [warehouseId]);
        if (!warehouse[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"warehouse not found",
                    },
                ],
            })
        }

        const warehouseData = await query("select * from warehouse where id = ? ", [warehouseId]    );
        res.status(200).json(warehouseData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
    
}); 

// add new warehouse
router.post('/add-warehouse',
body("name").isString().withMessage("please enter a valid warhouse name").isLength({min:1}).withMessage("warhouse name should be more than 2 characters !"),
body("location").isString().withMessage("please enter a valid warhouse location").isLength({min:1}).withMessage("warhouse location should be more than 10 characters !"),
body("supervisorId").isNumeric().withMessage("please enter a valid supervisor"),
async (req,res) => {
    try {
            // request validation 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // validate supervisor name 
            const query = util.promisify(conn.query).bind(conn); // for multiple query 
            const supervisorCheck = await query("select * from user where id = ? and type = 0", [req.body.supervisorId]);
        
            if (supervisorCheck.length ==  0 ) {
                res.status(404).json({
                    errors : [
                        {
                            msg:"supervisor id is not correct",
                        },
                    ],
                })
            }else {
                // prepair opject user to save it
            const warehouseData ={
                name: req.body.name,
                location: req.body.location,
                supervisorId: req.body.supervisorId,
                status : 1
            }

            // insert product into db 
            await query("insert into warehouse set ?",warehouseData);
            await query("update user set status = 1 where id = ?",[req.body.supervisorId]);

            res.status(200).json({
            msg : "warehous added successfully",
            })

            }    
            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// update warehouse 
router.put('/update-warehouse/:warehouseId',
body("name").isString().withMessage("please enter a valid warhouse name").isLength({min:1}).withMessage("warhouse name should be more than 2 characters !"),
body("location").isString().withMessage("please enter a valid warhouse location").isLength({min:1}).withMessage("warhouse location should be more than 10 characters !"),
body("supervisorId").isNumeric().withMessage("please enter a valid supervisor"),
body("status").isNumeric().withMessage("please enter 1 or 2"),
async (req,res) => {
    try {
        // request validation 
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
            // validate warehouseId
        const { warehouseId } = req.params;
        const warehouse = await query("select * from warehouse where id = ?", [warehouseId]);
        if (!warehouse[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"warehouse not found",
                    },
                ],
            })
        }
        // prepair opject product to update it
        const warehouseopj = {
            name: req.body.name,
            location: req.body.location,
            supervisorId: req.body.supervisorId,
            status:req.body.status,
        }

        // insert product into db 
        await query("update warehouse set ? where id = ?",[warehouseopj ,warehouseId]);

        res.status(200).json({
            msg : "product updated successfully",
        })


            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// delete warehouse
router.delete('/:warehouseId',async (req,res) => {
    try {
        // validate warehouseId
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { warehouseId } = req.params;
        const warehouse = await query("select * from warehouse where id = ?", [warehouseId]);
        if (!warehouse[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"warehous not found",
                    },
                ],
            })
        }

        //  insert warehous into db 
        await query("update user set status = 0 where id = ?",[warehouse[0].supervisorId])
        await query("delete from warehouse where id = ?", warehouseId);


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