import React from 'react';
import axios from 'axios';
import { apiService } from '../utils.js';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { ProfileMain } from './components/profile.js';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {},
            avatar: null
        }
    }

    toastHandle = () => {
        this.setState({loading:'errorComplete'});
    }

    componentDidMount(){
        axios.get(apiService+'/playerData/'+this.props.match.params.playerId)
        .then(response => {console.log(response);
            var avatar = null;
            if (response.data[0].twitchavatar !== null) avatar = response.data[0].twitchavatar;
            this.setState({data:response.data[0], loading:false, avatar: avatar});
        })
        .catch(error => {this.setState({loading:'error'})
    });
    }

    render () {

        if (this.state.loading === true) {
            return(
                <div>
                    <Header />
                    Loading...
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'error') {
            return(
                <div>
                    <Header />
                    <div className="unhappy-face">:(</div>
                    <Toast message="There was an error connecting to the server." callback={() => ToastHandle(this, 'errorComplete')} />
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'errorComplete') {
            return(
                <div>
                    <Header />
                    <div className="unhappy-face">:(</div>
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else {
            return(
                <div>
                <Header />
                Player Profile<p />
                <ProfileMain playerName={this.state.data.name} playerGames={this.state.data.games} playerLevel={this.state.data.level} host={this.state.data.host} twitchauthed={this.state.data.twitchauthed} twitchusername={this.state.data.twitchusername} avatar={this.state.avatar}/>
                </div>
            );
        } 
    }
}

export default ProfilePage;