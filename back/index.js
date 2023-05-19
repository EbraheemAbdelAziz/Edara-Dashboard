// ================= INITIALIZE EXEPRESS APP =================
const express = require('express');
const app = express();

// ================= GLOBAL MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('upload'));
const cors = require("cors");
app.use(cors());
const port = 4000 ;

// ================= REQUIRED MODULE =================
const auth = require('./routes/Auth');
const product = require('./routes/product');
const authorized = require("./middleware/authorize") ;
const warehouse = require("./routes/warehouse");
const supervisor = require("./routes/supervisor");
const request = require("./routes/request");
const superRequest = require("./routes/superRequest")

// ================= RUN THE APP =================
app.listen(port ,"localhost" , () => console.log("SERVER IS RUNING "));

// ================= API ROUTES  =================
app.use("/products",product);
app.use("/auth",auth);
app.use("/warehouses",warehouse)
app.use("/supervisors",supervisor)
app.use("/admin/requests",request)
app.use("/supervisor/requests",superRequest)
const superProduct = require("./routes/superProduct")
app.use("/superProduct",authorized,superProduct)
