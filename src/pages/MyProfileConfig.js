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
                var tabElements = this.tabs.map(tab => {  
                    return <div className="configTab" onClick={this.changeView}>{tab}</div>
                });
               this.setState({loading:false, data:res.data, userId:id, tabElements:tabElements});
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
            content = <div>
            <div className="configTitleText">Account Settings</div>
            <div className="configBodyText">
                Change your password.
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

export default MyProfileConfig;