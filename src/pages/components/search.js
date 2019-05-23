import React from 'react';

function SearchBar(){

    function postSearch() {
        var inpt = document.getElementById('search_input').value;
        console.log(inpt)
    }

    var el = <div className="search">
                <div className="search_left"></div>
                <input id="search_input"></input>
                <div className="search_right" onClick={()=>postSearch()}><div className="magnifying_glass">&#9906;</div></div>
            </div>

    return el;
}

export default SearchBar;