import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Album.css';

export default class Particles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            particles: []
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

        fetch(`http://127.0.0.1:5000/moderator/particles`, auth)
            .then(response => {
                const contentType = response.headers.get('content-type');
                this.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
            const particles = data['particles'];
            this.setState({particles: particles});
        }).catch((e) => {
            console.log(e);
        });
    }

    handleOnApprove(id) {
        const request = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };
        const scope = this;
        fetch(`http://127.0.0.1:5000/moderator/particles/${id}`, request)
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

    handleOnDelete(id) {
        const request = {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };
        const scope = this;
        fetch(`http://127.0.0.1:5000/moderator/particles/${id}`, request)
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

    render() {
        console.log(this.state['particles']);

        const articlesList = this.state['particles']
            .map((i) =>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <p className="font-weight-bold">
                                <Link to={`/particles/${i.id}`}>
                                    {i.name}
                                </Link>
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={this.handleOnDelete.bind(this, i.id)}>Delete
                                </button>
                                <button type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={this.handleOnApprove.bind(this, i.id)}>Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

    );

        return (
            <div>
                <section id="home">
                    <div className="container text-center wow fadeIn">
                        <h2>Particles</h2>
                        <hr className="colored"/>
                        <div className="row">
                            <div className="col-lg-12">
                                <div id="portfoliolist">
                                    <div className="album py-5 bg-light">
                                        <div className="container">
                                            <div className="row">
                                                {articlesList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta-form bg-dark">
                    <div className="container text-center">
                        <h3>Sign up to create your own article!</h3>
                        <hr className="colored"/>
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <div id="mc_embed_signup">
                                    <form role="form" method="post" id="mc-embedded-subscribe-form"
                                          name="mc-embedded-subscribe-form" target="_blank" noValidate>
                                        <div className="input-group input-group-lg">
                                            <input type="email" name="EMAIL" className="form-control" id="mce-EMAIL"
                                                   placeholder="Email address..."/>
                                            <span className="input-group-btn">
                                            <Link to="/signup" type="submit" id="mc-embedded-subscribe"
                                                  className="btn btn-primary">Sign up</Link>
                                        </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer"
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-footer.jpg)`}}>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-md-4 contact-details">
                                <h4><i className="fa fa-phone"/> Call</h4>
                                <p>0322-582-111</p>
                            </div>
                            <div className="col-md-4 contact-details">
                                <h4><i className="fa fa-map-marker"/> Visit</h4>
                                <p>
                                    79000 Lviv, Lviv Region
                                    <br/>
                                    Stepana Bandera Street, 12
                                </p>
                            </div>
                            <div className="col-md-4 contact-details">
                                <h4><i className="fa fa-envelope"/> Email</h4>
                                <p><a href="mailto:mail@example.com">coffice@lpnu.ua</a>
                                </p>
                            </div>
                        </div>
                        <div className="row copyright">
                            <div className="col-lg-12">
                                <p className="small">&copy; 2021 Vitality Articles Themes</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}