import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home.js';
import PlayersPage from './pages/Players.js';
import ProfilePage from './pages/ProfilePage.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import HostSignup from './pages/Signup-Host.js';
import SignUpComplete from './pages/SignupComplete.js';
import MyProfilePage from './pages/MyProfilePage.js';
import MyProfileConfig from './pages/MyProfileConfig.js';
import { CoinsPage, PurchasePage } from './pages/Coins.js';
import Exchange from './pages/Exchange.js';
import { BookingCalendar, SetCalendar } from './pages/components/calendar.js';
import { TwitchIntegration, TwitchComplete } from './pages/TwitchIntegration.js';
import './App.css';

class App extends Component {
  render() {
    return (
     <Router>
       <div>
       <Switch>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/host-signup" component={HostSignup} />
         <Route exact path="/complete" component={SignUpComplete} />
         <Route exact path="/players" component={PlayersPage} />
         <Route exact path="/profile" component={MyProfilePage} />
         <Route exact path="/profile/settings" component={MyProfileConfig} />
         <Route exact path="/exchange" component={Exchange} />
         <Route exact path="/coins" component={CoinsPage} />
         <Route exact path="/coins/purchase" component={PurchasePage} />
         <Route path="/players/:playerId" component={ProfilePage} />
         <Route exact path="/calendar" component={SetCalendar} />
         <Route path="/profile/settings/twitch-authenticate" component={TwitchIntegration} />
         <Route path="/profile/settings/twitch-authenticate-complete" component={TwitchComplete} />
       </Switch>
       </div>
     </Router>
    );
  }
}

export default App;
