const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;

app.listen(PORT,function () {
    console.log("Sever is running...");
});
//share api access all
app.use(function (req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// config to connect MySQL
const configDB = {
  host: "139.180.186.20",
  port: 3306,
  database: "t2207e",
  user: "t2207e",
  password:"t2207e123", // mamp: "root" --- xampp:"
  multipleStatements: true // cho phép sử dụng nhiều câu SQL trong 1 lần yêu cầu
};

const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list all class
app.get("/g3-insurance-company-vehicle",function (req,res){
  const sql = "select * from group3_insuranceproducts A left join group3_companies B on A.companyId = B.companyId left join group3_vehicles C on A.vehicleId = C.vehicleId;";
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});
// api product theo productId
app.get("/g3-insurance-by-productid",function (req,res){
  const productId = req.query.productId;
  const sql = `SELECT * FROM group3_insuranceproducts A 
                left join group3_companies B on A.companyId = B.companyId 
                left join group3_vehicles C on A.vehicleId = C.vehicleId 
                WHERE productId = ${productId};`;
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});

app.get("/g3-get-companies",function (req,res){
  const sql = "select * from group3_companies";
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});

app.get("/g3-insurance-by-company",function (req,res){
  const companyId = req.query.companyId;
  const sql = `SELECT * FROM group3_insuranceproducts A 
                left join group3_companies B on A.companyId = B.companyId 
                 left join group3_vehicles C on A.vehicleId = C.vehicleId 
                 WHERE A.companyId = ${companyId};`;
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});

app.get("/g3-get-vehicles",function (req,res){
  const sql = "select * from group3_vehicles";
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});

app.get("/g3-insurance-by-vehicle",function (req,res){
  const vehicleId = req.query.vehicleId;
  const sql = `SELECT * FROM group3_insuranceproducts A 
                left join group3_companies B on A.companyId = B.companyId 
                 left join group3_vehicles C on A.vehicleId = C.vehicleId 
                 WHERE A.vehicleId = ${vehicleId};`;
  conn.query(sql, function (err,data){
    if (err){
      res.send("404 not found");
    }else{
      res.send(data);
    }
  })
});