import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { apiService } from '../utils.js';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            password:'',
            email: '',
            displayname:'',
            repeatpassword:''
            }
    
    this.handleChange = this.handleChange.bind(this);

    }

   
    handleChange = (e) => {
        const target = e.target;
        const type = target.name; 
        this.setState({[type]:target.value});
    }

    handleClick = (e) => {
        var thiz = this;
        thiz.setState({loading:true});
        if (this.state.password === this.state.repeatpassword) {
            axios.post(apiService+'/signup/', {
                password:thiz.state.password,
                email:thiz.state.email,
                name:thiz.state.displayname
                }
            ).then(response => {
                thiz.setState({loading:false});
                console.log(response);
               window.location = response.request.responseURL;
            })
            .catch(e => {
                thiz.setState({loading:'error'});
            });
        }

        else {
            thiz.setState({loading:'error2'});
        }
    }

    render () {

        var btn;

        if (this.state.loading === true) {
            btn = <button className="login-btn-ghosted" label="Submit" primary={'true'} style={{width: '120px'}}>Register</button>
        }
        else {
          btn = <button className="login-btn" label="Submit" primary={'true'} onClick={(event) => this.handleClick(event)} style={{width: '120px'}}>Register</button>
        }


        var toast;

        if (this.state.loading === 'error') {
            toast = <Toast message="There was an error registering, please try again." callback={() => ToastHandle(this, false)}/>
        }

        if (this.state.loading === 'error2') {
            toast = <Toast message="Passwords don't match!" callback={() => ToastHandle(this, false)}/>
        }


        return(
            <div>
            <Header />
            <h1>Register a new account</h1><br />
            <h2><Link to={'/login/'}>&#60; Login</Link></h2>
            <div className="register_wrapper">
           <br/>
           Display Name<br />
            <input
            name="displayname"
            className="login-input"
            autoComplete="off"
            onChange = {this.handleChange}
             />
           <br/>
           Email<br />
            <input
            name="email"
            className="login-input"
            autoComplete="off"
            onChange = {this.handleChange}
             />
           <br/>
           Password<br />
             <input
               name="password"
               type="password"
               autoComplete="off"
               className="login-input"
               onChange = {this.handleChange}
               />
            
             <br/>Repeat Password<br />
             <input
               name="repeatpassword"
               type="password"
               autoComplete="off"
               className="login-input"
               onChange = {this.handleChange}
               />
             <br/>
             {btn}
             <p /><p />
             <Link to={'/host-signup/'}>Sign up as a Host</Link>
             </div>
            {toast}
            
            <Footer />
            </div>
        );
    }
}
export default Signup;