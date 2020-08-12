const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const Pool = require('pg').Pool;
const app = express();
const cors = require('cors');

const pool = new Pool({
    user:'ffhyjmxatkiapr',
    password: '7d693dc323dd4ff98bea914a6f40740d2b642adfb77c81914dabe605e9cb6fb9',
    host: 'ec2-54-197-254-117.compute-1.amazonaws.com',
    port: 5432,
    database: 'da8udtl1v4q733',

})


// Data Parsing 
// middleware 
app.use(express.urlencoded({
    extended: false

}));
// middleware
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'build')));


// send email 
// const text = "Hi! U can reset your password here {{Link}}";

// const { email } = req.body;
// console.log(req.body);
// // try {
//     const { email } = req.body;
//     const insertData =  await pool.query(
//         "INSERT INTO user_table (email) VALUES($1) [email]",

//     );
// } catch (err) {
//     console.log(err);

// }


// sendMail(email,function(err,data){
// if(err)
// {
//     res.status(500).json({message: "internal server Error"})
// }else{
//     res.status(200).json({message: 'Check your mail!!! '});
// }

// });
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: "anshuldaksh2016@gmail.com",
        pass: "Anshul@1999"
    }
});



// SMTP over
app.post("/register", (req, res) => {

    const { email } = req.body.email;

    console.log(req.body);
    var mailOptions = {
        from: 'anshuldaksh2016@gmail.com',
        to: req.body.email,
        subject: "Password ",
        html: `<p> Hi! ${req.body.email} </p>
                <h5>You can setup your password<a href="http://localhost:5000/reset/"> here </a></h5>`
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        }
        else {
            console.log("Message Sent !" + response.message);
            res.end(sent);
        }
    });
})




// https://dotquestionmark.com/event/game-development/
// https://us04web.zoom.us/j/72409177905?pwd=ZlpXUXdpOWlaMWlsa0lZbHNmZTdFQT09







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is listening"));