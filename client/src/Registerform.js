import React from 'react';
// import Recaptcha from 'react-recaptcha';
import './RegisterForm.css';
import axios from 'axios';
import { loadReCaptcha } from 'react-recaptcha-google';
import { ReCaptcha } from 'react-recaptcha-google';
import validator from 'validator';


class Registerform extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            email: '',
            
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    // componentDidMount() {
    //     const script = document.getElementsByClassName("g-recaptcha")

    //     script.src = "https://www.google.com/recaptcha/api.js";
    //     script.async = true;

    //     document.body.appendChild(script);
    // }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state);
        var data = { email: this.state.email };

        if (validator.isEmail(JSON.stringify(data))){

        
        fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then((info) => { console.log(info) })
    }
    else{
        alert("Invalid Email ! ");
    }
}
    

    
    // handle the state changed 
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
            // grab the state property
        })

    }
    componentDidMount() {
        loadReCaptcha();
      
}
    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }
    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, "<= your recaptcha token")
    }



    render() {
        return (
            <div className="form-div">
                <form method="post" action="/register" onSubmit={this.handleSubmit}>
                    Email : <br />
                    <input type="text" id="email" onChange={this.handleChange} />
                   

                    <div className="Captcha">
                        <ReCaptcha
                            size="normal"
                            data-theme="dark"
                            render="explicit"
                            sitekey="6Le2qb0ZAAAAAFpP9p0d2QQOf7FBtuZXUryjQ1pP"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />
                    </div>
                    <br />
                    <input type="submit" id="btn" value="Register" />
                </form>
            </div>
        )
    }
}



export default Registerform;