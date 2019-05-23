import React from 'react';
import { Header, Footer } from './template.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, format } from 'date-fns';

class BookingCalendar extends React.Component {
    constructor(){
        super();
        this.state = {
            startDate: new Date('May 24 2019'),
            data: {
                host: true,
                sessions:[
                    {
                        date: new Date('May 24 2019'),
                        times: [
                            {minute:30,
                                hour:15},
                                {minute:30,
                                    hour:16}
                        ]
                    },
                    {
                        date: new Date('May 23 2019'),
                        times: [
                            {minute:30,
                            hour:12},
                            {minute:30,
                                hour:13}
                        ]
                    }
                ]
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

        //get data here. query DB for all bookings where available = true.

        var arr=[];
        for (let x of this.state.data.sessions) {
            arr.push(x.date);
        }
        this.setState({availableDays:arr});
        this.handleChange(this.state.startDate);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
        for (let x of this.state.data.sessions) {
            if (x.date.toString() == date.toString()) {
                var f = [];
                for (let y of x.times) {
                    f.push(setHours(setMinutes(new Date(), y.minute), y.hour));
                }
                this.setState({availableTimes:f});
            }
        }
      }

      render(){
          return(
            <div>
                <Header />
                <div className="bodyWrapper">
                <h1>Book Play Time</h1><p />
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    includeDates={this.state.availableDays}
                    includeTimes={this.state.availableTimes}
                    shouldCloseOnSelect={false}
                    inline
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            <Footer forceBottom={true}/>
        </div>
        );
      }
}

class SetCalendar extends React.Component {
    constructor(){
        super();
        this.state = {
            startDate: new Date('May 24 2019'),
            selectedDates: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
    }

    componentDidMount(){
       
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

      handleClick(){
        var a = this.state.selectedDates;
        var date = this.state.startDate.toString();
        if (a.indexOf(date)===-1) {
            a.push(date);
            var eles = a.map(date=>{
                console.log(date);
                var d = new Date(date);
                var month = d.getMonth();
                var day = d.getDate();
                var year = d.getFullYear();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var str = `${hour}:${minute}, ${month}/${day}/${year}`;
                return <div className="date-selected">{str}</div>
            });
            this.setState({selectedDates:a, selectedDatesElements:eles});
        }        
      }

      handleConfirmClick(){
          //send data to server

        this.setState({selectedDates:[],selectedDatesElements:[]});

      }

      render(){
        var confirmBtn;
        if (this.state.selectedDates.length>0) {
            confirmBtn = <button onClick={this.handleConfirmClick} className="selectDate">Confirm Selection</button>;
        }

          return(
            <div>
                <Header />
                <div className="bodyWrapper">
                    <h1>Set Play Times</h1><p />
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    includeDates={this.state.availableDays}
                    includeTimes={this.state.availableTimes}
                    shouldCloseOnSelect={false}
                    inline
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <p />
                    <button onClick={this.handleClick} className="selectDate">Select Date</button>
                    <p />
                    <div>
                        {this.state.selectedDatesElements}
                    </div>
                    <p />
                    {confirmBtn}
                </div>
            <Footer forceBottom={true}/>
        </div>
        );
      }
}

export {
    BookingCalendar,
    SetCalendar
};