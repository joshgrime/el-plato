import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiService } from '../utils.js';
import { Header, Footer } from './components/template.js';

class BookingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slot:null,
            games:[],
            selectedGame:[],
            hostid:null
        };
        this.slotId = this.props.match.params.slotid;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(apiService+'/getSlot/'+this.slotId)
        .then(x=>{
            this.setState({slot:x.data[0], games:x.data[0].games, hostid:x.data[0].hostid});
        })
        .catch(x=>{
            console.log('There was an error');
        })
    }

    handleSubmit = () => {

        axios.post(apiService+'/makeBooking/', {
            slotid:this.slotId,
            game:this.state.selectedGame[0].id
        })
        .then(x=>{
            if (x.status === 200) {
                window.location = '/players/'+this.state.hostid;
            }
            else {
                //error message
            }
        })
    }

    handleChange = (e) => {

        var a = this.state.games;
        var b = this.state.selectedGame;

        var gid = e.target.getAttribute('gameid');

        if (e.target.className == 'purchase-Slot-game') {
            if (b.length > 0) {
                a.push(b[0]);
                b.length = 0;
            }
            for (let x of a) {
                if (x.id == gid) {
                    b.push(x);
                    var i = a.indexOf(x);
                    a.splice(i,1);
                    break;
                }
            }
        }
        else {
            a.push(b[0]);
            b.length = 0;
        }

        this.setState({games:a, selectedGame: b});

        console.log(this.state.games);
        console.log(this.state.selectedGame);

    }

    handleKeyDown = (e) => {
        e.preventDefault();
    };

    render () {

        var slot;
        var continueBtn;
        var selector;
        var text;
        var s = this.state.slot;
        var date = null;
        var time = null;
        if (s !== null) {
            time = s.time;
            date = s.date;
            var className = 'purchase-Slot-Booked';
            if (s.booked === 0) {
                text = `You are about to book a slot at ${time} on ${date}.
                Please ensure that you will be available at this time.\n
                You cannot undo a booking once it is made.`;
                className = 'purchase-Slot';
                if (this.state.selectedGame.length===0) {
                    continueBtn = <button className="purchase-Slot-btn-grey">Confirm Booking</button>;
                }
                else {
                    continueBtn = <button className="purchase-Slot-btn" onClick={this.handleSubmit}>Confirm Booking</button>;
                }
                var selectedGame = this.state.selectedGame.map(x=>{
                    return <div gameid={x.id} className="purchase-Slot-game-selected" onClick={this.handleChange}>{x.name}</div>
                });
                var gamesList = this.state.games.map(x=>{
                    return <div gameid={x.id} className="purchase-Slot-game" onClick={this.handleChange}>{x.name}</div>
                });
                selector = <div>Choose from {s.playerName}'s games:
                   {selectedGame}<p />
                   {gamesList}
                </div>
            }
            else {
                text = `This game is fully booked.`;
            }
            slot = <div className={className}>
                <div className="purchase-Slot-date">{s.date}<br />{s.time}</div>
                <div className="purchase-Slot-name"><Link to={'/players/'+this.state.hostid} style={{color:'white'}}>{s.playerName}</Link></div>
                <div className="purchase-Slot-coins">{s.price}</div>
                </div>;
        }


        return(
            <div>
            <Header />
           <h1>Booking</h1>
           <p />
           <Link to={'/players/'+this.state.hostid}><div>Back</div></Link>
           <div className="bodyWrapper">
               {slot}
               <p />
               <div className="purchase-Slot-text">
               {selector}
               <p />
                {text}
               {continueBtn}
               </div>
           </div>
            <Footer />
            </div>
        );
    }
}

export default BookingPage;