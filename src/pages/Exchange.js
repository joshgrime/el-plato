import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiService } from '../utils.js';
import Search from './components/search.js';
import { Header, Footer, Toast, ToastHandle } from './components/template.js';
import { CasualSelect, VsSelect, CoachSelect, 
        CoachRow }                            from './components/exchange.js';
import { timingSafeEqual } from 'crypto';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: null,
            stage: 1,
            vsSelected: true,
            casualSelected: true,
            coachSelected: true,
            data: [
                {
                    name: 'Joshua the Coach',
                    rating: 5,
                    price: 10,
                    next: '01/05/19',
                    types: [ 0, 1, 2 ]
                }
            ],
            coachRows: []
        }
    }

    typeClickHandler = (type) => {
        if (type === 0) {
            if (this.state.casualSelected) {
                this.setState({casualSelected:false});
            }
            else {
                this.setState({casualSelected:true});
            }
        }
        if (type === 1) {
            if (this.state.vsSelected) {
                this.setState({vsSelected:false});
            }
            else {
                this.setState({vsSelected:true});
            }
        }
        if (type === 2) {
            if (this.state.coachSelected) {
                this.setState({coachSelected:false});
            }
            else {
                this.setState({coachSelected:true});
            }
        }
    }

    componentDidMount(){

        axios.get(apiService+'/host-profiles/')
        .then(response => {
            console.log('Exchange profile data:');
            console.log(response);
            var x = response.data.map(row=>{

                var types = [];

                if (row.vs) types.push(1);
                if (row.casual) types.push(0);
                if (row.coach) types.push(2);

                return <CoachRow   name={row.name}
                             rating={row.rating}
                             price={row.price}
                             next={row.next}
                             id={row.id}
                             types={types} />
             });
             this.setState({coachRows:x});
             this.setState({loading:false});
        });

        
    }

    render () {

        if (this.state.loading === true) {
            return(
                <div>
                    <Header />
                    <h1>The Exchange</h1>
                    Loading...
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'error') {
            return(
                <div>
                    <Header />
                    <h1>The Exchange</h1>
                    <div className="unhappy-face">:(</div>
                    <Toast message="There was an error loading profiles." callback={() => ToastHandle(this, 'errorComplete')} />
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else if (this.state.loading === 'errorComplete') {
            return(
                <div>
                    <Header />
                    <h1>The Exchange</h1>
                    <div className="unhappy-face">:(</div>
                    <Footer forceBottom={true} />
                </div>
            )
        }

        else {
            return(
                <div>
                <Header />
                <h1>The Exchange</h1>
                <Link to={'/coins'}>Buy Coins</Link>
                    <div className="exchangeWrapper">
                        <div className="exchangeHeader">
                        <CasualSelect callback={this.typeClickHandler} selected={this.state.casualSelected} />
                        <VsSelect callback={this.typeClickHandler} selected={this.state.vsSelected} />
                        <CoachSelect callback={this.typeClickHandler} selected={this.state.coachSelected} />
                        <div style={{marginTop:'25px',marginLeft:'auto',marginRight:'auto'}}>
                        <Search />
                        </div>
                        </div>
                        <div className="exchangeBody">
                            {this.state.coachRows}
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } 
    }
}


export default Exchange;