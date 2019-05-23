import React from 'react';
import { Header, Footer } from './components/template.js';

class SignUpComplete extends React.Component {
    render () {
        return(
            <div>
            <Header />
           <h1>Registration was successful!</h1>
           <p />
            <Footer forceBottom={true} />
            </div>
        );
    }
}

export default SignUpComplete;