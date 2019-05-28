import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiService } from '../utils.js';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { ProfileMain } from './components/profile.js';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class MyProfileConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            twitchauthed: false,
            twitchUsername: null,
            selectedTab: 'default',
            userId: null,
            startDate: new Date(),
            data: {
                host: true,
                availableDays:[new Date(),
                    new Date('May 24 2019')]
            },
            tabElements: []
        }
        this.tabs = [
            'Games',
            'Profile',
            'Account'
        ];
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    getUserId = (id) => {

        if (id !== false) {
            axios.get(apiService+'/playerData/'+id)
            .then(res=> {
                console.log(res);
                if (res.data[0].host === 1) this.tabs.unshift('Host Settings');
                
                var twitchauthed = this.state.twitchauthed;
                var twitchUsername;
                if (res.data[0].twitchauthed === 1) {
                    twitchauthed = true;
                    twitchUsername = res.data[0].twitchusername;
                }

                var tabElements = this.tabs.map(tab => {  
                    return <div className="configTab" onClick={this.changeView}>{tab}</div>
                });

               this.setState({loading:false, data:res.data[0], userId:id, tabElements:tabElements, twitchauthed: twitchauthed, twitchUsername: twitchUsername});
            });
        }

        else {
            window.location = '/login';
        }     
    }
    
    changeView = (e) => {
        var type = e.target.innerText.toLowerCase();
        this.setState({selectedTab:type});
    }

    render () {
        var content;

        if (this.state.selectedTab === 'games') {
            content = <div>
                <div className="configTitleText">Games</div>
                <div className="configBodyText">
                    Add games to your profile.
                </div>
                <GamesConfig enabledGames={this.state.data.games} />
            </div>;
        }

        else if (this.state.selectedTab === 'profile') {
            content = <div>
            <div className="configTitleText">Profile</div>
            <div className="configBodyText">
                Update your avatar.
            </div>
        </div>;
        }

        else if (this.state.selectedTab === 'account') {
            var twitchIntegration;
            if (!this.state.twitchauthed) {
                twitchIntegration = <div><Link to={'/profile/settings/twitch-authenticate'}>Integrate Twitch</Link></div>
            }
            else {
                twitchIntegration = <div>{this.state.twitchUsername}<p />Disable Twitch Integration</div>
            }
            content = <div>
            <div className="configTitleText">Account Settings</div>
            <div className="configBodyText">
                Change your password.
                <p />
                {twitchIntegration}
            </div>
        </div>;
        }

        else if (this.state.selectedTab === 'host settings') {
            content = <div>
            <div className="configTitleText">Host Settings</div>
            <div className="configBodyText">
                Set your timetable!<p />
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    includeDates={this.state.availableDays}
                />
            </div>
        </div>;
        }

        else {
            content = <div>
                <div className="configTitleText">Account Settings</div>
                <div className="configBodyText">
                    Connect games, update your profile, change your password.
                </div>
            </div>;
        }

            if (this.state.loading) {
                return(
                    <div>
                    <Header userIdCallback={this.getUserId} />
                    <Link to={'/profile'}>
                        <h1>Back to Profile</h1>
                    </Link>
                    <Footer />
                    </div>
                );
            }
            else {
                return(
                    <div>
                    <Header />
                    <Link to={'/profile'}>
                        <h1>Back to Profile</h1>
                    </Link>
                    <div className="configWrapper">
                        <div className="configSide">{this.state.tabElements}</div>
                        <div className="configContent">
                            {content}
                        </div>
                    </div>
                    <Footer />
                    </div>
                );
            }
        } 
}

class GamesConfig extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            games:[],
            enabledGames:[],
            disabledGames:[],
            pendingEnable:[],
            pendingDisable:[]
        };
        this.toast = null;
        this.handleClick = this.handleClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        axios.get(apiService+'/games')
        .then(res => {
           var a = [];
           for (let x of res.data){
               a.push(x);
           }        
           var enabledGames = [];
           var disabledGames = [];
            if (this.props.enabledGames !== null) {
                var b = this.props.enabledGames.split(',');
                    for (let y=0;y<a.length;y++) {
                    var enabled = false;
                    for (let x of b) {
                        if (a[y].abbrv === x) {
                            enabled = true;
                        }
                    }
                    if (enabled) {
                        enabledGames.push(a[y]);
                    }
                    else {
                        disabledGames.push(a[y]);
                    }
                }
            }
            else {
                disabledGames = a;
            }
            this.pending = enabledGames;
            this.setState({games:a,enabledGames:enabledGames, disabledGames:disabledGames});
        });
    }

    handleClick = (e) => {
        var g = e.target.attributes[1].nodeValue;

        if (e.target.className == 'config-enabledGame') {

            var index = -1;
                var arr2 = this.state.enabledGames;
                for (let i=0; i<arr2.length;i++) {
                    if (arr2[i].abbrv == g) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    arr2.splice(index, 1);
                }

                var arr = this.state.pendingDisable;
                for (let x of this.state.games){
                    if (g == x.abbrv) {
                        arr.push(x);
                        break;
                    }
                }
                this.setState({pendingDisable:arr, enabledGames:arr2});
        }

        else if (e.target.className == 'config-disabledGame') {

            var index = -1;
            var arr2 = this.state.disabledGames;
            for (let i=0; i<arr2.length;i++) {
                if (arr2[i].abbrv == g) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                arr2.splice(index, 1);
            }

            var arr = this.state.pendingEnable
            for (let x of this.state.games){
                if (g == x.abbrv) {
                    arr.push(x);
                    break;
                }
            }
            this.setState({pendingEnable:arr, disabledGames:arr2});

        }

        else if (e.target.className == 'config-enabledGame-pending') {

            
            var index = -1;
            var arr2 = this.state.pendingEnable;
            for (let i=0; i<arr2.length;i++) {
                if (arr2[i].abbrv == g) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                arr2.splice(index, 1);
            }

            var arr = this.state.disabledGames;
            for (let x of this.state.games){
                if (g == x.abbrv) {
                    arr.push(x);
                    break;
                }
            }
            this.setState({disabledGames:arr, pendingEnable:arr2});

        }

        else if (e.target.className == 'config-disabledGame-pending') {
            
            var index = -1;
            var arr2 = this.state.pendingDisable;
            for (let i=0; i<arr2.length;i++) {
                if (arr2[i].abbrv == g) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                arr2.splice(index, 1);
            }

            var arr = this.state.enabledGames;
            for (let x of this.state.games){
                if (g == x.abbrv) {
                    arr.push(x);
                    break;
                }
            }
            this.setState({enabledGames:arr, pendingDisable:arr2});

        }
    }

    handleSave = () => {
        var games = this.state.enabledGames.concat(this.state.pendingEnable);
        var arr = [];
        for (let x of games) {
            arr.push(x.abbrv);
        }
        var str = arr.join();
        axios.post(apiService+'/updateGameConfig', {
            games: str
        })
        .then(res=>{
            console.log('******')
            console.log(res);
            if (res.status == 200) {
                window.location = '/profile/settings';
            }
            else if (res.status == 500) {
               this.toast = <Toast message="There was a server error. Please try later." callback={() => ToastHandle(this, false)} />;
            }
        });
    }

    render(){

        var toast;

        if (this.toast !== null) {
            toast = this.toast;
        }

        var enabledGamesMap = this.state.enabledGames.map(z => {
            return <div gameId={z.id} gameabrrv={z.abbrv} className="config-enabledGame" onClick={this.handleClick}>{z.name}</div>
        });
        var disabledGamesMap = this.state.disabledGames.map(zz => {
            return <div gameId={zz.id} gameabbrv={zz.abbrv} className="config-disabledGame" onClick={this.handleClick}>{zz.name}</div>
        });

        var pendingEnabledGamesMap = this.state.pendingEnable.map(zzz => {
            return <div gameId={zzz.id} gameabrrv={zzz.abbrv} className="config-enabledGame-pending" onClick={this.handleClick}>{zzz.name}</div>
        });
        var pendingDisabledGamesMap = this.state.pendingDisable.map(zzzz => {
            return <div gameId={zzzz.id} gameabbrv={zzzz.abbrv} className="config-disabledGame-pending" onClick={this.handleClick}>{zzzz.name}</div>
        });

        return(
            <div>
                Enabled Games:
                {enabledGamesMap}
                {pendingEnabledGamesMap}
                <p />
                Disabled Games:
                {disabledGamesMap}
                {pendingDisabledGamesMap}
                <p />
                <button onClick={this.handleSave} className="config-save-btn">Save</button>
                {toast}
            </div>
        );
    }
}

export default MyProfileConfig;