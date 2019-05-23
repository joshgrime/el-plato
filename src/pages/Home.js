import React from 'react';
import { Header, Footer } from './components/template.js';
import Search from './components/search.js';

class HomePage extends React.Component {
    render () {
        return(
            <div>
            <Header />
           <h1>Home</h1>
           <p />
            <Search />
            <Footer forceBottom={true} />
            </div>
        );
    }
}

export default HomePage;