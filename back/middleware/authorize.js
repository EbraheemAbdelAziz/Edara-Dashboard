const conn = require("../db/conection");
const util = require("util");

const authorized = async (req,res,next) => {
    const query = util.promisify(conn.query).bind(conn); // for multiple query 
    const {token} = req.headers ;
    const user = await query("select * from user where token = ?", [token])
    if (user[0]) {
        next();
    } else {
        res.status(403).json({
            msg:"you are not authorize to open this page"
        })
    }
}

module.exports = authorized;