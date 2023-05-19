const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const conn = require("../db/conection");
const admin = require('../middleware/admin');
const util = require("util");
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const authorized = require('../middleware/authorize');


//get all supervisor
router.get('/',admin,authorized,async (req, res) => {
    try {
        let search ="";
        if (req.query.search) {
            search = `AND name LIKE  '%${req.query.search}%'`; 
        }
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const supervisorData = await query(`select * from user where type = 0 ${search}`);
        res.status(200).json(supervisorData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
    
}); 

// get spacfic supervisor 
router.get('/:supervisorId',async (req, res) => {
    try {
        const { supervisorId } = req.params;
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const supervisor = await query("select * from user where id = ? AND type = 0", [supervisorId]);
        if (!supervisor[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"supervisor not found",
                    },
                ],
            })
        }
       
        const supervisorData = await query("select * from user where id = ? AND type = 0 ",[supervisorId]);
        res.status(200).json(supervisorData)
        
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
    
}); 

// add new supervisor
router.post('/add-supervisor',
body("email").isEmail().withMessage("Please enter the valid Email") ,
body("phone").isString().withMessage("Please enter the valid phone number") ,
body("password").isLength({min : 8 , max : 15}).withMessage("password shold be between 8 - 12 character ") ,
async (req,res) => {
    try {
            // request validation 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // validate supervisor email 
            const query = util.promisify(conn.query).bind(conn); // for multiple query 
            const emailCheckExists = await query("select * from user where email = ? AND type = 0", [req.body.email]);
        
            if (emailCheckExists.length >  0 ) {
                res.status(400).json({
                    errors : [
                        {
                            msg:"email already exist !",
                        },
                    ],
                })
            }
            
            // prepair opject user to save it
            
            const supervisorData ={
                email: req.body.email,
                phone: req.body.phone,
                password:await bcrypt.hash(req.body.password,10),
                token:crypto.randomBytes(16).toString("hex"),
            }
    
            // insert user opject into db 
            await query("insert into user set ?",supervisorData);
            delete supervisorData.password;
            res.status(200).json(supervisorData);
            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// update supervisor 
router.put('/update-supervisor/:supervisorId',
body("email").isEmail().withMessage("Please enter the valid Email") ,
body("phone").isMobilePhone().withMessage("Please enter the valid phone numper") ,
body("password").isLength({min : 1 , max : 15}).withMessage("password shold be between 8 - 12 character ") ,
async (req,res) => {
    try {
        // request validation 
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
            // validate supervisorId
        const { supervisorId } = req.params;
        const supervisor = await query("select * from user where id = ? AND type = 0", [supervisorId]);
        if (!supervisor[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"supervisor not found",
                    },
                ],
            })
        }
        // prepair opject supervisor to update it
        const supervisoropj = {
            email: req.body.email,
            phone: req.body.phone,
            password:await bcrypt.hash(req.body.password,10),
            token:crypto.randomBytes(16).toString("hex"),
        }

        // update supervisor into db 
        await query("update user set ? where id = ?",[supervisoropj ,supervisorId]);

        res.status(200).json({
            msg : "supervisor updated successfully",
        })

            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});

// delete supervisor
router.delete('/:supervisorId',async (req,res) => {
    try {
        // validate supervisorId
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const { supervisorId } = req.params;
        const supervisor = await query("select * from user where id = ? AND type = 0", [supervisorId]);
        if (!supervisor[0]) {
            res.status(404).json({
                errors : [
                    {
                        msg:"supervisor not found",
                    },
                ],
            })
        }

        // delete supervisor from db 
        await query("delete from user where id = ?", supervisorId);

        res.status(200).json({
            msg : "supervisor deleted successfully",
        })
            
    } catch (err) {
        res.status(500).json({
            err : err,
        }) 
    }
});
module.exports = router;