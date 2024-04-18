const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('./config');
const connect = require('./connect');
const app = express();
const item = require('./item');
const rest = require('./rest');
const bodyParser = require('body-parser');
const Buffer = require('Buffer');
const fs = require('fs');
const order = require('./order');
const jwt = require('jsonwebtoken');
const jwtKey = 'chabi';
//const payment = require('./payment');

app.set('maxHttpHeaderSize', 81920);
app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, resp, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + Date.now() + ".jpg")
        }
    })
}).single("img");

const uploadR = multer({
    storage: multer.diskStorage({
        destination: function (req, resp, cb) {
            cb(null, "rest")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + Date.now() + ".jpg")
        }
    })
}).single("image");

app.post('/addproduct', upload, async (req, resp) => {
    let conn = new item({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        restor: req.body.restor,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/jpg'
        }
    });
    let result = await conn.save();
    resp.send(result);
})

app.put('/addproduct/:id',upload, async (req,resp)=>{
    
    try{
        const id = req.params.id;
        const {name, price, category,restor, desc} = req.body;
        const img = {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/jpg'
        }

        const updatedData = await item.findByIdAndUpdate(
            id,
            { name, price, category,restor, desc,img},
            { new: true }
          );
      
          resp.json(updatedData);
    }
    catch (error){
        console.log(error);
        resp.send({error: "Internal server error"});
    }
})

app.delete('/addproduct/:id',verifyToken, async (req,resp)=>{
    let result = await item.deleteOne({ _id : req.params.id });
    resp.send(result);
})

app.post('/resturants', uploadR, async (req, resp) => {
    let resturant = new rest({
        name: req.body.name,
        address: req.body.address,
        owner: req.body.owner,
        contact: req.body.contact,
        email: req.body.email,
        moto: req.body.moto,
        password: req.body.password,
        image: {
            data: fs.readFileSync('rest/' + req.file.filename),
            contentType: 'image/jpg'
        }
    });
    let user = await resturant.save();
    //resp.send(result);
    user = user.toObject();
    delete user.password;
    jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong please try again after " });
        }
        resp.send({ user, auth: token });
    })
})

app.put('/resturants/:id', verifyToken, async (req, resp)=>{
    console.log(req.body);
    let result = await rest.updateOne(
        {_id: req.params.id},
        {$set: {address: req.body.address}}
    );
    
    resp.send(result);
})

app.delete('/resturants/:id',verifyToken, async (req,resp)=>{
    let result = await rest.deleteOne({ _id : req.params.id });
    resp.send(result);
})

app.post('/register', async (req, resp) => {
    let con = new connect(req.body);
    let user = await con.save();
    user = user.toObject();
    delete user.password;
    jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong please try again after " });
        }
        resp.send({ user, auth: token });
    })
    //resp.send(result);
});

app.post('/login', async (req, resp) => {
    let admin = false;
    if (req.body.email && req.body.password) {
        if(req.body.password == 'admin')
        {
            admin = true;
        }
        let user = await connect.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong please try again sometimes" });
                }
                resp.send({ user, auth: token, admin });
            })
            //resp.send(result);
        }
        else {
            resp.send({ result: "User not found" });
        }
    }
    else {
        resp.send({ result: "User not found" });
    }

});

app.post('/rlogin', async (req, resp) => {
    if (req.body.email && req.body.name && req.body.owner && req.body.password) {
        let user = await rest.findOne(req.body).select("-password");
        let result = {name: user.name, owner: user.owner, email:user.email};
        if (result) {
            jwt.sign({ result }, jwtKey, {expiresIn: '2h'}, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong please try again sometimes" });
                }
                let ans = {};
                
                    let arr = user.image.data;
                    let bufferData = Buffer.from(arr);
                    let base64String = bufferData.toString('base64');
                    ans = {name:user.name, owner:user.owner, _id:user._id, address:user.address, contact:user.contact, email:user.email, moto:user.moto, image:base64String};
                resp.send({ user:ans, auth: token });
            })
            //resp.send(result);
        }
        else {
            resp.send({ result: "User not found" });
        }
    }
    else {
        resp.send({ result: "User not found" });
    }
});

app.get('/items/:key', verifyToken ,async (req, resp) => {
    let result = await item.find({
        "$or": [
            {name : {$regex : req.params.key}},
            {restor: {$regex : req.params.key}},
            {category: {$regex : req.params.key}}
        ]
    });
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ name: result[i].name, price: result[i].price, category: result[i].category, restor: result[i].restor, desc: result[i].desc, img: base64String })
    }
    
    resp.send(ans);
});

app.get('/items', verifyToken, async (req, resp)=>{
    let result = await item.find();
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ _id: result[i]._id, name: result[i].name, price: result[i].price, category: result[i].category, restor: result[i].restor, desc: result[i].desc, img: base64String })
    }
    
    resp.send(ans);
})

app.get('/users', verifyToken, async (req, resp)=>{
    let result = await connect.find();
    resp.send(result);
})

app.put('/users/:id', verifyToken, async (req, resp)=>{
    console.log(req.body);
    let result = await connect.updateOne(
        {_id: req.params.id},
        {$set: {address: req.body.address}}
    );
    resp.send(result);
})

app.delete('/users/:id', verifyToken, async (req, resp)=>{
    let result = await connect.deleteOne({_id: req.params.id});
    resp.send(result);
})

app.get('/resturants', verifyToken, async (req, resp)=>{
    let result = await rest.find();
    resp.send(result);
})

app.post('/orders',verifyToken, async (req, resp) => {
    let id = "";
    for (let i = 0; i < 7; i++) {
        let c = Math.floor(Math.random() * 7);
        id += c;
    }
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let hour = date.getHours();
    let min = date.getMinutes();
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (month + 1 < 10) {
        month = "0" + (month + 1);
    }
    let dateTime = "" + hour + ":" + min + " | " + day + " " + (month) + " " + year;
    console.log(req.body.name, req.body.resturant);
    let orders = new order({ orderId: id, date: dateTime, name: req.body.name, address: req.body.address, resturant: req.body.resturant, price: req.body.price });
    let result = await orders.save();

    resp.send(result);
});

app.get('/orders/:key', verifyToken, async (req, resp) => {
    let result = await order.find({resturant:req.params.key});
    resp.send(result);
});

app.get('/orders', verifyToken, async (req, resp) => {
    let result = await order.find();
    resp.send(result);
});

app.delete(`/orders/:id`, verifyToken, async (req, resp) => {
    let result = await order.deleteOne({ orderId: req.params.id });
    resp.send(result);
});

app.get(`/items/:name`, verifyToken, async(req,resp)=>{
    let result = await item.find({restor:req.params.name});
    resp.send(result);
});
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    //console.log(token);
    if (token) {
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "token is invalid" });
            }
            else {
                next();
            }
        })

    }
    else {
        resp.status(403).send({ result: "please add token in header" });
    }
}

//payment.pay();

const axios = require('axios');
const uniqid = require('uniqid');
const sha256 = require('sha256');
let name = "";
let address = "";
let amt = 0;
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

const SALT_INDEX = 1;

app.post('/', (req, resp) => {
    name = req.body.name;
    address = req.body.address;
    amt = req.body.sum;
    amt = amt*100;
    console.log(name,address);
    resp.send({pass:"message passed"});
})

app.get('/pay', (req, resp) => {
    const merchantTransactionId = uniqid();
    const userId = 123
    const payload = {
        merchantId: "PGTESTPAYUAT",
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amt,
        redirectUrl: `http://localhost:5000/redirect-url/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    }
    const bufferObj = Buffer.from(JSON.stringify(payload), 'utf8');
    const base63EncodingPayload = bufferObj.toString('base64');
    const xVerify = sha256(base63EncodingPayload + "/pg/v1/pay" + SALT_KEY) + "###" + SALT_INDEX;
    const options = {
        method: 'post',
        url: `${PHONE_PE_HOST_URL}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify,
        },
        data: {
            request: base63EncodingPayload,
        }
    };
    axios
        .request(options)
        .then(function (response) {
            //console.log(merchantTransactionId);
            resp.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        })
        .catch(function (error) {
            console.error(error);
        });
})
app.get('/redirect-url/:merchantTransactionId', (req, resp) => {
    const { merchantTransactionId } = req.params;
    if (merchantTransactionId) {
        const xVerify = sha256(`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY) + "###" + SALT_INDEX;
        console.log(merchantTransactionId);
        const options = {
            method: 'get',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                "X-MERCHANT-ID": merchantTransactionId,
                "X-VERIFY": xVerify,
            },

        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                if (response.data.code === 'PAYMENT_SUCCESS') {
                    //go to the success payment front end page
                    resp.redirect("http://localhost:3000/paysuccess");
                }
                else if (response.data.code === 'PAYMENT_ERROR') {
                    //go to the error page of frontend
                    resp.redirect("http://localhost:3000/payerror");
                }
                else {
                    // go to the pending page
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    else {
        resp.send({ error: "nothing happend" });
    }
})

app.listen(5000);
