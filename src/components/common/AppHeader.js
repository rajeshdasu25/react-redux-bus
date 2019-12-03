import React from 'react';
import { Navbar } from 'react-bootstrap';

function AppHeader() {
    return (
        <header>
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="/">React Bus</Navbar.Brand>
            </Navbar>
        </header>
    )
};

export default AppHeader;