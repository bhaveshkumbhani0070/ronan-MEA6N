var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs'); //For encryption
var jwt = require("jsonwebtoken");
var validator = require('validator');
var config=require('./config');
var connection = mysql.createConnection({
    host: "213.175.201.170",
    user: "romanov",
    password: "DdhdhY45$%&rhdhdt%",
    database : 'romanov_business'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

connection.connect(function(err) {
    if (err) {
      console.log('Connection Error',err);
    }
    else{
        console.log('Connected');
    }
});

router.post('/register',function(req,res,next){
    receivedValues = req.body
    if (JSON.stringify(receivedValues) === '{}')
    {
        console.log('There is no data in a body');
        res.json({code:400,message:"There is no data in a body"});
        return;
    }
    else
    {
        console.log("*** Validating User Details... ");
        usercolumns = ["mobile","password", "fullname", "email", "address"];
        var dbValues = [];
         for (var iter = 0; iter < usercolumns.length; iter++) {
            columnName = usercolumns[iter];
            console.log('columnName',columnName);
            if (columnName == 'email')
            {
                email1 = req.body.email;
                if (validator.isEmail(email1))
                {
                    console.log('Email is vaild');
                }
                else
                {
                    console.log('Email is not valid');
                    res.json({"code": 200, "status": "Error", "message": "Email is not Valid"});
                    return;
                }
            }
            if ((receivedValues[columnName] == undefined || receivedValues[columnName] == "") && (columnName == 'mobile' || columnName == 'password'))
            {
                console.log("*** Redirecting: ", columnName, " field is required");
                res.json({"code": 200, "status": "Error", "message": columnName + " field is undefined"});
                return;
            }
            else if (receivedValues[columnName] !== undefined && receivedValues[columnName] !== "" && columnName == 'password')
            {
                receivedValues.password = bcrypt.hashSync(req.body.password);
            }
            if (receivedValues[columnName] == undefined || receivedValues[columnName] == "")
            {
                dbValues[iter] = '';
            }
            else
            {
                dbValues[iter] = receivedValues[columnName];
            }
        }

                tableName = "users";
                connection.query('select count(id) as count from ?? where mobile=?', [tableName, req.body.mobile],
                    function (err, rows) {
                        if (err)
                        {
                            console.log('Error for select data', err);
                            res.json({'code': 200, 'status': 'Error', 'message': 'Error for select data'});
                            return;
                        }
                        else
                        {
                            if (rows[0].count > 0)
                            {
                                console.log('Mobile number alredy created, Please login');
                                res.json({"code": 200, "status": "Error", "message": "Mobile number alredy created, Please login"});
                                return;
                            }
                            else
                            {
                                console.log('dbvalue',dbValues);
                                connection.query('INSERT INTO users(??) VALUES (?)', [usercolumns, dbValues],
                                    function (err, rows) {
                                        if (!err)
                                        {
                                            console.log('*** Redirecting: User Created \n');
                                            tableName = "users";
                                            //CHECKING USERNAME EXISTENCE
                                            var mobile = req.body.mobile;
                                            connection.query('SELECT * FROM users WHERE mobile = ?', [mobile],
                                                function (err, rows) {
                                                    if (!err)
                                                    {
                                                        if (rows.length == 1)
                                                        {
                                                            var token = jwt.sign(receivedValues, config.secret, {
                                                                expiresIn: 1440 * 60 * 30 // expires in 1440 minutes
                                                            });
                                                            res.json({
                                                                'code': 200,
                                                                'status': 'Success',
                                                                'token': token,
                                                                'userData': rows
                                                            });

                                                            return;
                                                        }
                                                        else
                                                        {
                                                            console.log("*** Redirecting: Your mobile and/or password is incorrect. Please try again", err);
                                                            res.json({"code": 200,"status": "Error","message": "Your mobile and/or password is incorrect. Please try again"});
                                                            return;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        console.log("*** Redirecting: Your email and/or password is incorrect. Please try again", err);
                                                            res.json({"code": 200,"status": "Error","message": "Your email and/or password is incorrect. Please try again"});
                                                            return;
                                                    }
                                                });
                                        }
                                        else
                                        {
                                              console.log('Error for inserting data',err);
                                              res.json({'code':200,'status':'Error','message':'Error for inserting data'});
                                              return;
                                        }
                                    });
                            }
                        }
                    });
    }
})

router.post('/login',function(req,res,next){
    console.log("*** Staging Requested for staging Authenticating User... ***");
    receivedValues = req.body //RESPONSE FROM WEB

    if (JSON.stringify(receivedValues) === '{}')
    {
        console.log('There is no data in a body');
        res.json({code:400,message:"There is no data in a body"});
        return;
    }
    else
    {
        usercolumns = ["mobile", "password"];
        for (var iter = 0; iter < usercolumns.length; iter++) {
            columnName = usercolumns[iter];
            if (receivedValues[columnName] == undefined && (columnName == 'mobile' || columnName == 'password'))
            {
                console.log("*** Redirecting: ", columnName, " field is required")
                res.json({"code": 200, "status": "Error", "message": columnName + " field is undefined"});
                return;
            }
            else if (receivedValues[columnName] !== undefined || receivedValues[columnName] !== "")
            {
                if (columnName == 'password')
                {
                    // var validpassword = req.checkBody('password', 'Password length should be minimum 8 digit').len(8,100).validationErrors.length;
                    // if (validpassword)
                    // {
                    //     logger.error('url=', URL.url,'Responce=', 'Password length should be minimum 8 digit', 'Email id=', req.body.email);
                    //     console.error('Password length should be minimum 8 digit');
                    //     res.json({
                    //         "code": 200,
                    //         "status": "Error",
                    //         "message": "Password length should be minimum 8 digit"
                    //     });
                    //     return;
                    // }
                }
            }
        }//CHECKING USERNAME EXISTENCE
        mobile = receivedValues.mobile;
                connection.query('SELECT * FROM users WHERE mobile = ?', [mobile],
                    function (err, rows) {
                        if (!err)
                        {
                            if (rows.length == 1)
                            {
                                if (bcrypt.compareSync(req.body.password, rows[0].password))
                                {
                                    console.log('rows',rows);
                                    var alldata = rows;
                                    var userid = rows[0].id;
                                    var tokendata = (receivedValues, userid);
                                    var token = jwt.sign(receivedValues, config.secret, {
                                        expiresIn: 1440 * 60 * 30 // expires in 1440 minutes
                                    });
                                    console.log("*** Authorised User");
                                    res.json({
                                        "code": 200,
                                        "status": "Success",
                                        "token": token,
                                        "userData": alldata,
                                        "message": "Authorised User!"
                                    });
                                    return;
                                }
                                else
                                {
                                    console.log("*** Redirecting: Unauthorised User");
                                    res.json({"code": 200, "status": "Fail", "message": "Unauthorised User!"});
                                    return;
                                }
                            }
                            else
                            {
                                console.error("*** Redirecting: No User found with provided name");
                                res.json({
                                    "code": 200,
                                    "status": "Error",
                                    "message": "No User found with provided name"
                                });
                                return;
                            }
                        }
                        else
                        {
                            console.error("*** Redirecting: No User found with provided mobile");
                                res.json({
                                    "code": 200,
                                    "status": "Error",
                                    "message": "No User found with provided mobile"
                                });
                                return;
                        }
                    });
                connection.on('error', function (err) {
                    console.log('*** Redirecting: Error Creating User...');
                    res.json({"code": 200, "status": "Error", "message": "Error Checking Username Duplicate"});
                    return;
                });
    }
})

module.exports = router;