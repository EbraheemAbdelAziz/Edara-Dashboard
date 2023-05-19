const conn = require("../db/conection");
const util = require("util");

const admin = async (req,res,next) => {
    const query = util.promisify(conn.query).bind(conn); // for multiple query 
    const {token} = req.headers ;
    const admin = await query("select * from user where token = ?", [token])
    if (admin[0] && admin[0].type == 1) {
        next();
    } else {
        res.status(403).json({
            msg:"you are not authorize to open this page"
        })
    }
}

module.exports = admin;