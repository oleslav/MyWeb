import React, {Component} from 'react'
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="hidden">
                                    <Link className="page-scroll" to="#page-top"/>
                                </li>
                                <li>
                                    <Link className="page-scroll" to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className="page-scroll" to="/about">About</Link>
                                </li>
                                <li>
                                    <Link className="page-scroll" to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link className="page-scroll" to="/login">Log in</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}