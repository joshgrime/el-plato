import React from 'react';

class SetTime extends React.Component {
    constructor(){
        super();
        this.state = {
            loaded: false,
            thisMonthCalendar: null,
            nextMonthCalendar: null,
            thisMonth:null,
            nextMonth:null,
            daySelected:null,
            timesSelected:[],
            timesSelectedMap:[],
            timesShown:[],
            timesShownMap:[]
        }
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.months = [
            {
                name: 'January',
                days: 31
            },
            {
                name: 'February',
                days: 28
            },
            {
                name: 'March',
                days: 31
            },
            {
                name: 'April',
                days: 30
            },
            {
                name: 'May',
                days: 31
            },
            {
                name: 'June',
                days: 30
            },
            {
                name: 'July',
                days: 31
            },
            {
                name: 'August',
                days: 31
            },
            {
                name: 'September',
                days: 30
            },
            {
                name: 'October',
                days: 31
            },
            {
                name: 'November',
                days: 30
            },
            {
                name: 'December',
                days: 31
            }
        ];
        this.hours = [
            '00:00',
            '00:30',
            '01:30',
            '02:00',
            '02:30',
            '03:00',
            '03:30',
            '04:00',
            '04:30',
            '05:00',
            '05:30',
            '06:00',
            '06:30',
            '07:00',
            '07:30',
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30',
            '22:00',
            '22:30',
            '23:00',
            '23:30'
        ];
    }


    createCalendars = () => {
        var t = this;
        var date = new Date();
        var currentMonth = date.getMonth();
        var december = false;
        var nextMonth = currentMonth + 1;
        var currentYear = date.getFullYear();
        var nextYear = currentYear;
        if (currentMonth === 11) {
            december = true;
        }
        if (december) {
            nextMonth = 0;
            nextYear = currentYear + 1;
        } //add leap year logic
        var currentMonthStartDay = new Date('01-'+this.months[currentMonth].name+'-'+currentYear);
        var nextMonthStartDay = new Date('01-'+this.months[nextMonth].name+'-'+nextYear);

        var day1cm = currentMonthStartDay.toString().substring(0,3);
        var day1nm = nextMonthStartDay.toString().substring(0,3);

        var startDayIndex = this.days.indexOf(day1cm);
        var startDayIndex2 = this.days.indexOf(day1nm);

        var thisMonthCalendarIndex = makeCal(this.months[currentMonth].days, startDayIndex, currentMonth, currentYear);
        var nextMonthCalendarIndex = makeCal(this.months[nextMonth].days, startDayIndex2, nextMonth, nextYear);

        var tmc = this.days.concat(thisMonthCalendarIndex);
        var nmc = this.days.concat(nextMonthCalendarIndex);

        var thisMonthCalendar = tmc.map(x => {
           return mapCal(x); 
        });

        var nextMonthCalendar = nmc.map(x => {
            return mapCal(x);
        });

        function handleClick(e){
            var str = `${e.x.day}/${e.x.month}/${e.x.year}`;
            //get already selected times for this day from server and set timesShown and timesSelected states
            console.log(t.hours);
            t.setState({daySelected:{obj:e.x,str:str}, timesShown:t.hours});
        }

        function makeCal(days, sdi, m, y){
            var pushCounter = 0;
            var arr = [];
            for (let i=1; i<43; i++) {
                if (i>days + pushCounter) {
                    break;
                }
                if (i-1<sdi) {
                    pushCounter++;
                    arr.push(null);
                }
                else {
                    var day = i - pushCounter;
                    arr.push({day:day, month: m, year: y});
                }
            }
            return arr;
        }

        function mapCal(x){
            console.log(x);
            var content;
            var oc;
            var className = 'calendarSquare';
            if (typeof x == 'string') {
                content = x;
                className = 'calendarSquare-day'
            }
            if (x !== null) {
                if (x.day !== undefined) {
                    oc = function() {handleClick({x})};
                    content = x.day;
                }
            }
            else {
                className = 'calendarSquareg';
            }
            return <div className={className} onClick={oc}>{content}</div>;
        }

        this.setState({thisMonthCalendar: thisMonthCalendar, nextMonthCalendar: nextMonthCalendar, thisMonth: this.months[currentMonth].name, nextMonth: this.months[nextMonth].name});
    }

    handleTimeClick = (x,f) => {
        if (f === 'time') {
            var a = this.state.timesSelected;
            var b = this.state.timesShown;
            a.push(x);
            var i = b.indexOf(x);
            b.splice(i,1);
            this.setState({timesSelected:a, timesShown:b});
        }
    }
    
    handleReset = (x) => {
        console.log('reset with ');
        console.log(x);
        this.setState({timesSelected:[], timesShown: x});
    }

    componentDidMount(){
        if (!this.state.loaded) {
            this.createCalendars();
            this.setState({loaded:true});
        }
    }

    render () {

        var allTimes = this.state.timesShown.map(x=>{
            return <div className="time" onClick={()=>{this.handleTimeClick(x,'time')}}>{x}</div>;
        });

        var timesSelectedMap = this.state.timesSelected.map(x=>{
        return <div className="time-selected" onClick={()=>{this.handleTimeClick(x,'time-selected')}}>{x}</div>;
        });


        var resetBtn;
        if (timesSelectedMap.length > 0) {
            resetBtn = <button onClick={()=>{this.handleReset(this.hours)}}>Reset Day's Selections</button>
        }

        var timeSelector;
        if (this.state.daySelected !== null) {
            timeSelector = <div>Select times for {this.state.daySelected.str}<p />
            
            <div className="selectTimesWrapper-right-inner">
            {allTimes}
            </div>

            <div className="selectTimesWrapper-right-inner">
            {timesSelectedMap}
            </div>

            </div>;
        }

        if (this.state.thisMonthCalendar !== null) {
            return(
                <div>
                <div className="setTimeWrapper">
                <div className="setTimeWrapper-left">
                <div className="calenderMonth">{this.state.thisMonth}</div>
                <div className="calendarContainer">
                {this.state.thisMonthCalendar}
                </div>
                <p />
                <div className="calenderMonth">{this.state.nextMonth}</div>
                <div className="calendarContainer">
                {this.state.nextMonthCalendar}
                </div>
                </div>
                <div className="setTimeWrapper-right">
                {timeSelector}<p />
                {resetBtn}
                </div>
                </div>
                </div>);
        }

        return(
            <div>
            set time
            </div>
        );
    }
}

export default SetTime;