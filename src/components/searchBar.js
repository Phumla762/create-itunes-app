import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {FormControl, Form} from 'react-bootstrap';
import './App.css';

function searchBar(){
    return(
        <header className="header">
        <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">
            <div className="wrap-brand">
                <h2 className="header-name">iTunes Search API</h2>
            </div>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="nav-text">
                <Nav className="mr-auto">
                <Link to="/music" className="link">
                    music
                </Link>
                <Link to="/podcast" className="link">
                    podcast
                </Link>
                <Link to="/movies" className="link">
                    movies
                </Link>
                <Link to="/audiobook" className="link">
                    audiobook
                </Link>
                </Nav>
                <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

            </Navbar.Text>
        </Navbar.Collapse>
        </Navbar>
        </header>

    )
}





export default searchBar;