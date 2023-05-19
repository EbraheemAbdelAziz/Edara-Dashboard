const router = require("express").Router();
const conn = require("../db/conection");
const { body, validationResult } = require('express-validator');
const util = require("util");
const bcrypt = require('bcrypt');

// login 
router.post("/login" ,
body("email").isEmail().withMessage("Please enter the valid Email") ,
body("password").isLength({min : 8 , max : 12}).withMessage("password shold be between 8 - 12 character ") ,
async (req,res) => {
    try {
        const email = req.body.email
        // fields validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // email validation (is exist)
        const query = util.promisify(conn.query).bind(conn); // for multiple query 
        const userData = await query("select * from user where email = ?", [email]);
        
        if ( userData.length !=  0 ) {
            const passwordCheck = await bcrypt.compare(req.body.password ,userData[0].password)
        if (passwordCheck) {
            delete userData[0].password;
            res.status(200).json(userData);
        }else {
            res.status(404).json({
                errors : [
                    {
                        msg:"password not found",
                    },
                ],
            })
        }
        }else{
            res.status(400).json({
                err : "Email not found",
            })
        }
        

        // Compare Hashed Password
        
        

    } catch (err) {
        res.status(500).json({
            err : err,
    })
}
})
module.exports = router ;