import React from 'react';
import { Header, Footer } from './components/template.js';
import SetTime from './Set-Time.js';

class TimeTest extends React.Component {
    render () {
        return(
            <div>
            <Header />
           <p />
            <SetTime />
            <Footer />
            </div>
        );
    }
}

export default TimeTest;