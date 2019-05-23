import React from 'react';
import { Link } from 'react-router-dom';

function CasualSelect(props){

    var name = 'select';

    if (props.selected) {
        name += ' casual_selected';
    }

    return <div className={name} onClick={()=>{props.callback(0)}}>Casual</div>;
}

function VsSelect(props){

    var name = 'select';

    if (props.selected) {
        name += ' vs_selected';
    }

    return <div className={name} onClick={()=>{props.callback(1)}}>VS</div>;
}

function CoachSelect(props){

    var name = 'select';

    if (props.selected) {
        name += ' coach_selected';
    }

    return <div className={name} onClick={()=>{props.callback(2)}}>Coach</div>;
}

class CoachRow extends React.Component {
    constructor(props){
        super(props);

        this.typeIndicator = (function(x){
            var bg0  = 'black';
            var bg1 = 'black';
            var bg2 = 'black';
            if (x.indexOf(0) !== -1) {
                bg0 = '#3582a5';
            }
            if (x.indexOf(1) !== -1) {
                bg1 = 'brown';
            }
            if (x.indexOf(2) !== -1) {
                bg2 = '#1ec45e';
            }
        
            return(
                <div className="coachTypes">
                    <div className="coachTypes_m" style={{backgroundColor:bg0}}></div>
                    <div className="coachTypes_m" style={{backgroundColor:bg1}}></div>
                    <div className="coachTypes_m" style={{backgroundColor:bg2}}></div>
                </div>
            );

        })(this.props.types);

    }

    render(){
        return(
            <div className="coachRow">
                <div className="coachName">
                <Link to={'/players/'+this.props.id} >{this.props.name}</ Link>
                </div>
                <div className="coachRating">
                {this.props.rating}
                </div>
                <div className="coachNext">
                {this.props.next}
                </div>
                {this.typeIndicator}
                <div className="coachPrice">
                {this.props.price}
                </div>
                <CoachRowBuy />
            </div>
        )
    }
}

function CoachRowBuy() {

    return(
        <div className="inline-buy-btn">
            BOOK
        </div>
    )

}


export {
    CasualSelect,
    VsSelect,
    CoachSelect,
    CoachRow
};