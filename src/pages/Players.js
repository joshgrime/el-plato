import React from 'react';
import axios from 'axios';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import Search from './components/search.js';
import { apiService } from '../utils.js';
import { ProfileMini } from './components/profile.js';

class PlayersPage extends React.Component {
    constructor(props) {
    super();
    this.state = {
        loading: true,
        players: []
    }
}

    componentDidMount() {
        axios.get(apiService+'/playerData/')
        .then(response => {
            console.log(response.data)
        var map = response.data.map(player=>(
                <ProfileMini
                    playerName={player.name}
                    playerGames={player.games}
                    playerLevel={player.level}
                    playerId={player.id}
                    avatar={player.twitchavatar}
                    margin={50} />
                ));
        this.setState({
            players: map,
            loading: false
        });
    })
    .catch(error => {
        this.setState({
            loading: 'error'
        });
    })
    }

    render () {

        if (this.state.loading === true) {
            return(
                <div>
                <Header />
                <h1>Players</h1><p />
                <h2>Loading...</h2>
                <Footer forceBottom={true} />
                </div>
            );
        }

        else if (this.state.loading === 'error') {
            return(
                <div>
                    <Header />
                    <h1>Players</h1><p />
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
                    <h1>Players</h1><p />
                    <div className="unhappy-face">:(</div>
                    <Footer forceBottom={true} />
                </div>
            )
        }


        else {
            return(
                <div>
                <Header />
                <h1>Players</h1>
                <div className="bodyWrapper">
                
                    <div className="center">
                        <Search />
                    </div>
    
                    <div className="profilesMini" style={{marginTop:'40px'}}>
                        {this.state.players}
                    </div>
    
                </div>
    
                <Footer />
                </div>
            );
        }
    }
}

export default PlayersPage;