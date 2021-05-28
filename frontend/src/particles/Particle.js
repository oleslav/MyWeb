import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Particle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            particle: [],
            id: props.match.params.id
        };
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

        fetch(`http://127.0.0.1:5000/moderator/particles/${this.state.id}`, auth)
            .then(response => {
                const contentType = response.headers.get('content-type');
                this.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
            this.setState({particle: data});
        }).catch((e) => {
            console.log(e);
        });
    }

    handleOnApprove() {
        const request = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };
        const scope = this;
        fetch(`http://127.0.0.1:5000/moderator/particles/${this.state.id}`, request)
            .then(response => {
                const contentType = response.headers.get('content-type');
                scope.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
        }).catch((e) => {
            console.log(e);

        });
        window.location.reload();
    }

    handleOnDelete() {
        const request = {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };
        const scope = this;
        fetch(`http://127.0.0.1:5000/moderator/particles/${this.state.id}`, request)
            .then(response => {
                const contentType = response.headers.get('content-type');
                scope.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
        }).catch((e) => {
            console.log(e);
        });
        this.props.history.push('/particles');
    }

    render() {
        return (
            <section id="home">
                <div className="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <h2 className="text-center">{this.state.particle.name}</h2>
                                <hr className="colored"/>
                                <p>{this.state.particle.text}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={this.handleOnDelete.bind(this, this.state.particle.id)}>Delete
                                    </button>
                                    <button type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={this.handleOnApprove.bind(this, this.state.particle.id)}>Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}