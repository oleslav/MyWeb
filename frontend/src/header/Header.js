import React, {Component} from 'react'
import {Link} from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        console.log(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
        const auth = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };

        fetch(`http://127.0.0.1:5000/current_user`, auth)
            .then(response => {
                const contentType = response.headers.get('content-type');
                this.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
            this.setState({user: data});
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        let insert = (
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
                    <li>
                        <Link className="page-scroll" to="/signup">Sign up</Link>
                    </li>
                </ul>
            );
        if (this.state.user !== undefined) {
            if (this.state.user.role === 'moderator') {
                insert = (
                    <ul className="nav navbar-nav navbar-right">
                        <li className="hidden">
                            <Link className="page-scroll" to="#page-top"/>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/particles">Review</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/articles">Home</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/about">About</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/contact">Contact</Link>
                        </li>
                    </ul>
                );
            } else if (this.state.user.role === 'user') {
                insert = (
                    <ul className="nav navbar-nav navbar-right">
                        <li className="hidden">
                            <Link className="page-scroll" to="#page-top"/>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/articles/make">Create</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/articles">Home</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/about">About</Link>
                        </li>
                        <li>
                            <Link className="page-scroll" to="/contact">Contact</Link>
                        </li>
                    </ul>
                );
            }
        }
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {insert}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}