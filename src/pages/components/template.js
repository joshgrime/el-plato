import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiService } from '../../utils.js';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            authenticated: null,
            username: null
        }
    }
    componentDidMount() {
            axios.get(apiService+'/sc')
            .then(res => {
                if (res.data.authenticated) {
                    this.setState({authenticated:true, username:res.data.username});
                    if (this.props.userIdCallback !== undefined) {
                        this.props.userIdCallback(res.data.userid);
                    }
                }
                else {
                    if (this.props.userIdCallback !== undefined) {
                    this.props.userIdCallback(false);
                    }
                    this.setState({authenticated:false});
                }
            });
    }
    render(){
        var userIcon;

        if (this.state.authenticated === true) {
            userIcon = <span><Link to={'/profile'}>{this.state.username}</Link> <a href={'/logout'}>Logout</a></span>;
        }
        else {
            userIcon = <Link to={'/login'}>Log In</Link>;
        }

        return(
            <div className="header">
                <div className="logo">EL-PLATO</div>
                <div className="header_links">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/players'}>Players</Link>
                    <Link to={'/exchange'} className={'exchangeLink'}>Exchange</Link>
                    {userIcon}
                </div>
            </div>
        );
    }
}

class Footer extends React.Component {
    constructor(props) {
        super();
    }
    render(){
        var style;
        if (this.props.forceBottom) {
           style = {position:'absolute', bottom: '0px'};
        }
        else {
            style = {};
        }
        return(
            <div className="footer" style={style}>
                <div className="footerCenter">
                    <div className="footerLeft">
                        <Link to={'/#/'} className="footerLink">Careers</Link>
                        <Link to={'/#/'} className="footerLink">Partners</Link>
                        <Link to={'/#/'} className="footerLink">Investors</Link>
                        <Link to={'/#/'} className="footerLink">Terms of Service</Link>
                    </div>
                    <div className="footerMiddle">
                        <Link to={'/#/'} className="footerLink">Twitch</Link>
                        <Link to={'/#/'} className="footerLink">Reddit</Link>
                        <Link to={'/#/'} className="footerLink">Instagram</Link>
                        <Link to={'/#/'} className="footerLink">Twitter</Link>
                    </div>
                    <div className="footerRight">
                        Copyright Josh Grime 2019
                    </div>
                </div>
            </div>
        );
    }
}

class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.timer = (function(timer){
            if (timer === undefined) return 5000;
            else return timer;
        })(this.props.timer);
    }
    componentDidMount(){
        var t = this.timer;
        if (this.props.callback !== undefined) {
        var callback = this.props.callback;
            setTimeout(function(){
                let el = document.querySelector('.toast');
                if (el !== null) {
                    el.style.animation = 'fadeout 2s';
                    setTimeout(function(){
                        if (el !== null) {
                        el.style.opacity = 0;
                        callback();
                        }
                    }, 1800);
                }
                }, t);
        }
    }
    render(){
            return(
                <div className="toast">
                    {this.props.message}
                </div>
            );
    }
}

function ToastHandle(x,y){
    x.setState({loading:y});
}

export {
    Header,
    Footer,
    Toast,
    ToastHandle
}