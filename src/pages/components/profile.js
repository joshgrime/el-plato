import React from 'react';
import { Link } from 'react-router-dom';

class ProfileMini extends React.Component {
    constructor(props) {
        super(props);
        this.games = (function(g){
            if (g === null) return 'None';
                        var str = '';
                        for (let x of g) {
                            str += x + ' ';
                        }
                        return str;
                    })(this.props.playerGames);

        this.margin = (function(m){
                            if (m === undefined) {
                                return '0px';
                            }
                            else {
                                return m + 'px';
                            }
                         })(this.props.margin);
    }
    render (){
        var avatar;
        if (this.props.avatar !== null) {
            avatar = <img alt="" src={this.props.avatar} style={{height:'100px', width: '100px'}}></img>;
        }
        return(
            <div className="profile_mini" style={{marginTop:this.margin}}>
                <div className="profile_mini_avatar">{avatar}</div>
                <div className="profile_mini_text">
                    <div className="profile_mini_name"><Link to={'/players/'+this.props.playerId}>{this.props.playerName}</Link></div>
                    <div className="profile_mini_level">Level: {this.props.playerLevel}</div>
                    <div className="profile_mini_games">{this.games}</div>
                </div>
                
            </div>
        );
    }

}

class ProfileMain extends React.Component {
    constructor(props) {
        super(props);
        this.games = (function(g){
                    if (g === null) return 'None';
                        var str = '';
                        for (let x of g) {
                            str += x + ' ';
                        }
                        return str;
                    })(this.props.playerGames);

        this.margin = (function(m){
                            if (m === undefined) {
                                return '0px';
                            }
                            else {
                                return m + 'px';
                            }
                         })(this.props.margin);

        this.goToTwitch = this.goToTwitch.bind(this);

    }

    goToTwitch = () => {
        window.open("https://www.twitch.tv/"+this.props.twitchusername);
    }

    render (){

        var avatar;
        if (this.props.avatar !== null) {
            avatar = <img alt="" src={this.props.avatar}></img>;
        }

        var host = <div></div>;
        if (this.props.host === 1) {
            host = <div className="host-profile-tag">HOST</div>;
        }

        var twitch = <div></div>;
        if (this.props.twitchauthed === 1) {
            twitch = <div className="host-twitch-tag" onClick={this.goToTwitch}>
                <div className="host-twitch-tag-left">TWITCH</div>
                <div className="host-twitch-tag-right">{this.props.twitchusername}</div>
            </div>;
        }

        var coins = <div></div>;
        if (this.props.coins !== undefined) {
            coins = <div>{this.props.coins} coins</div>;
        }

        return(
            <div className="profile_main" style={{marginTop:this.margin}}>
                <div className="profile_main_avatar">{avatar}</div>
                <div className="profile_main_text">
                    <div className="profile_main_name">{this.props.playerName}</div>
                    {host}
                    {twitch}
                    <div className="profile_main_level">Level: {this.props.playerLevel}</div>
                    <div className="profile_main_games">{this.games}<br />{coins}</div>
                </div>
                
            </div>
        );
    }

}

export {
    ProfileMini,
    ProfileMain
}
