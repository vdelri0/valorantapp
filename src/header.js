import React from 'react';

function Header ({links}) {
    return (
        <header className="App-header">
            <div className="App-logo">
            <h1>One Tap</h1>
            </div>
            <div className="App-navbar">
            {links.map(link => <a>{link}</a>)}
            </div>
        </header>
    )
}

export default Header;