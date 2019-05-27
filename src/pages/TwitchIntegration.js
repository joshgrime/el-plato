import React from 'react';
import axios from 'axios';
import { apiService } from '../utils.js';
import { Header, Footer } from './components/template.js';

class TwitchIntegration extends React.Component {
    constructor(){
        super();
    }

    handleClick = () => {
        axios.get('/profile/settings/twitch-authenticate-get')
        .then(res=>{
            window.location = res.data;
        });
    }

    render(){
        return(
            <div>
                <Header />

            <div className="bodyWrapper">
                <h1>Continue with your Twitch integration.</h1>
                <br />
                Integrating with Twitch allows us to verify your identity, and add Twitch stats to your profile.<p />
                <button onClick={this.handleClick}>Continue</button>
            </div>

                <Footer forceBottom={true} />
            </div>
        );
    }
}

class TwitchComplete extends React.Component {
    constructor(){
        super();
        this.state = {
            created: undefined,
            sentRequest: false
        }
    }

    componentDidMount(){
        if (!this.state.sentRequest) {
            var keys = document.location.hash;
            var arr = keys.split('&');
            var accesstoken = arr[0].substring(14);
            var idtoken = arr[1].substring(9);
            axios.post(apiService+'/newTwitchToken', {
                at: accesstoken,
                id: idtoken
            })
            .then(res=>{
                if (res.status === 200) {
                    this.setState({created:true});
                    setTimeout(function(){
                        window.location = '/profile/settings';
                    },2000);
                }
                else {
                    this.setState({created:false});
                }
            })
        }
    }

    render(){
        if (this.state.created) {
            return(
                <div>
                    <Header />
    
                Twitch Integrated!
    
                    <Footer forceBottom={true} />
                </div>
            );
        }
        else if (this.state.created === false) {
            return(
                <div>
                    <Header />
    
                Failed.
    
                    <Footer forceBottom={true} />
                </div>
            );
        }
        else if (this.state.created === undefined) {
            return(
                <div>
                    <Header />
    
                Attempting to integrate Twitch with your account.
    
                    <Footer forceBottom={true} />
                </div>
            );
        }

    }
}

export {
    TwitchIntegration, TwitchComplete
};