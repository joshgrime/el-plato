import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiService } from '../utils.js';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { ProfileMain } from './components/profile.js';

class MyProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userId: null,
            data: {},
            avatar: null
        }
    }

    getUserId = (id) => {
        if (id !== false) {
            axios.get(apiService+'/playerData/'+id)
            .then(res=> {
                var avatar = null;
                 if (res.data[0].twitchavatar !== null) avatar = res.data[0].twitchavatar;
                this.setState({loading:false, data:res.data, userId:id, avatar: avatar});
            });
        }

        else {
            window.location = '/login';
        }     
    }

    render () {

        if (this.state.loading === true) {
            return(
                <div>
                    <Header userIdCallback={this.getUserId} />
                    Loading...
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'error') {
            return(
                <div>
                    <Header userIdCallback={this.getUserId} />
                    <div className="unhappy-face">:(</div>
                    <Toast message="There was an error connecting to the server." callback={() => ToastHandle(this, 'errorComplete')} />
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'errorComplete') {
            return(
                <div>
                    <Header userIdCallback={this.getUserId} />
                    <div className="unhappy-face">:(</div>
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else {

            console.log('Loaded:');
            console.log(this.state.data[0].name);

            return(
                <div>
                <Header userIdCallback={this.getUserId} />
                <Link to={'/profile/settings'}>Account Settings</Link><p />
                <ProfileMain playerName={this.state.data[0].name} playerGames={this.state.data[0].games} playerLevel={this.state.data[0].level} coins={this.state.data[0].coins} twitchauthed={this.state.data[0].twitchauthed} twitchusername={this.state.data[0].twitchusername} host={this.state.data[0].host} avatar={this.state.avatar} userid={this.state.userid} />
                </div>
            );
        } 
    }
}

export default MyProfilePage;