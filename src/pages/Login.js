import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { apiService } from '../utils.js';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            email:'',
            password:'',
            host:false,
            authenticated:false
            }
    this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(apiService+'/sc')
        .then(res => {
            console.log('User is logged in');
            console.log(res);
        });
    }
   
    handleChange = (e) => {
        console.log('changed');
        const target = e.target;
        this.setState({[target.type]:target.value});
    }

    handleClick = (e) => {
        var thiz = this;
        thiz.setState({loading:true});
        console.log('posting');
        console.log({
            email:thiz.state.email,
            password:thiz.state.password
            });

        axios.post(apiService+'/login/', {
                email:thiz.state.email,
                password:thiz.state.password
            }
        ).then(response => {
            console.log(response);
            thiz.setState({loading:false});
            window.location = response.request.responseURL;
        })
        .catch(e => {
            thiz.setState({loading:'error'});
        });
    }

    render () {

        var btn;

        if (this.state.loading === true) {
            btn = <button className="login-btn-ghosted" label="Submit" primary={'true'}>Login</button>
        }
        else {
          btn = <button className="login-btn" label="Submit" primary={'true'} onClick={(event) => this.handleClick(event)}>Login</button>
        }

        var toast;

        if (this.state.loading === 'error') {
            toast = <Toast message="There was an error logging in, please try again." callback={() => ToastHandle(this, false)}/>
        }


        return(
            <div>
            <Header />
            <h1>Login</h1>
            <div className="login_wrapper">
            <p />
            Email<br />
            <input
            type="email"
            className="login-input"
            autoComplete="off"
            onChange = {this.handleChange}
             />
           <br/>
           Password<br />
             <input
               type="password"
               autoComplete="off"
               className="login-input"
               onChange = {this.handleChange}
               />
             <br/>
             {btn}
             <p /><p />
             <p>Don't have an account? <Link to={'/signup/'}>Register here</Link></p>
             
             </div>
             {toast}
            <Footer />
            </div>
        );
    }
}
export default Login;