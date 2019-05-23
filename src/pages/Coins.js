import React from 'react';
import { Link } from 'react-router-dom';
import {Header, Footer } from './components/template.js';
import axios from 'axios';
import { apiService } from '../utils.js';

class CoinsPage extends React.Component {
    constructor(){
        super();
        this.state = {
            selected:null
        }
    }


    handleClick = (type) => {
        var amount = type * 1000;
        this.setState({selected:type, amount: amount});
    }

    render(){

        var bundle1BtnClass = 'bundleTop';
        var bundle2BtnClass = 'bundleTop';
        var bundle3BtnClass = 'bundleTop';

        if (this.state.selected === 1) {
            bundle1BtnClass = 'bundleTop-Selected'
        }
        if (this.state.selected === 2) {
            bundle2BtnClass = 'bundleTop-Selected'
        }
        if (this.state.selected === 3) {
            bundle3BtnClass = 'bundleTop-Selected'
        }
        
        var buyBtn;

        if (this.state.selected !== null) {
            buyBtn = <Link to={{pathname:'/coins/purchase', state:this.state.selected}}><div className="buyBtn">Buy</div></Link>;
        }

    
        return(
            <div>
                <Header />
                <h1>Purchase Coins</h1>
                <div className="coinsPageBody">
                    <div className="bundles">
                    <div className="bundle">
                        
                    <div className={bundle1BtnClass} onClick={()=>{this.handleClick(1)}}>100</div>
                        <div className="bundleBottom">
                        £20
                        </div>
                            
                    </div>
                        <div className="bundle">
                        <div className={bundle2BtnClass} onClick={()=>{this.handleClick(2)}}>500</div>

                            <div className="bundleBottom">
                            £30
                            </div>
                        </div>
                        <div className="bundle">
                        <div className={bundle3BtnClass} onClick={()=>{this.handleClick(3)}}>2000</div>

                            <div className="bundleBottom">
                            £50
                            </div>
                        </div>
                    </div>
                    {buyBtn}
                </div>
                <Footer />
            </div>
        );
    }
}

class PurchasePage extends React.Component {
    constructor(props){
        super(props);
        this.bundle = this.props.location.state;
    }

    postPayment = () => {
        axios.post(apiService+'/payment', {
            amount: this.state.amount
        })
        .then(res=>{
            if (res.statusText === 'OK') {
                window.location = '/profile';
            }
        });
    }

    componentDidMount(){
        if (this.bundle === undefined) window.location = '/coins';
        else if (this.bundle === 1) this.setState({amount:100});
        else if (this.bundle === 2) this.setState({amount:500});
        else if (this.bundle === 3) this.setState({amount:2000});
    }

    render(){
        console.log(this.props.location);

        return(
            <div>
                 <Header />
                    <div className="coinsPageBody" style={{marginTop:'100px'}}>
                    You chose bundle {this.bundle} on the previous page.
                    <div className="buyBtn" onClick={this.postPayment}>Confirm</div>
                    <Link to={'/coins'}><div className="cancelBtn">Cancel</div></Link>
                    </div>
                <Footer />
            </div>
        );
    }
}

export { CoinsPage, PurchasePage };