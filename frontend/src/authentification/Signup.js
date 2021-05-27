import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlert: false
        }
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleOnClick() {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        };
        const scope = this;
        fetch(`http://127.0.0.1:5000/signup`, request)
            .then(response => {
                const contentType = response.headers.get('content-type');
                scope.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            if (this.state.status !== 200) {
                this.setState({isAlert: true});
                scope.setState({message: data.status});
            }
        }).catch((e) => {
            console.log(e);
            console.log("error");
        });
    }

    closeAlert() {
        this.setState({isAlert: false});
    }

    render() {
        if (this.state.status === 201) {
            if (this.state.email !== null) {
                localStorage.setItem('email', this.state.email);
            }

            if (this.state.password !== null) {
                localStorage.setItem('password', this.state.password);
            }

            if (localStorage.getItem('email') !== null && localStorage.getItem('password') !== null) {
                return <Redirect push to="/articles"/>;
            }
        }

        const alert = this.state.isAlert &&
            (
                <div className="alert alert-danger">
                    <a className="close" data-dismiss="alert" aria-label="close"
                       onClick={this.closeAlert.bind(this)}>×</a>
                    <strong>Error!</strong><br/>
                    {this.state.message}
                </div>
            )

        return (
            <section id="signup">
                <div className="container wow fadeIn">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={process.env.PUBLIC_URL + "/assets/img/creative/about.jpg"}
                                 className="img-responsive" alt=""/>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1>Sign up</h1>
                            <hr className="colored"/>
                            <form className="form-signin text-center">
                                {alert}
                                <p>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control"
                                           onChange={this.handleEmailChange.bind(this)}/>
                                </p>
                                <p>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control"
                                           onChange={this.handlePasswordChange.bind(this)}/>
                                </p>

                            </form>
                            <button onClick={this.handleOnClick.bind(this)} className="btn btn-primary">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}