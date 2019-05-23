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
        return(
            <div className="profile_mini" style={{marginTop:this.margin}}>
                <div className="profile_mini_avatar"><img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLJY3jmOtV19-eSC2T5o_TVUgdnqbp5Rf2oPGwQwdnCit2AblYw" style={{height:'100px', width: '100px'}}></img></div>
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
    }
    render (){

        var host = <div></div>;
        if (this.props.host === 1) {
            host = <div className="host-profile-tag">HOST</div>;
        }

        var coins = <div></div>;
        if (this.props.coins !== undefined) {
            coins = <div>{this.props.coins} coins</div>;
        }

        return(
            <div className="profile_main" style={{marginTop:this.margin}}>
                <div className="profile_main_avatar"><img alt="" src={picture}></img></div>
                <div className="profile_main_text">
                    <div className="profile_main_name">{this.props.playerName}</div>
                    {host}
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

var picture = "data:image/jpeg;base64,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";