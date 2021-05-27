import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Index extends Component {
    render() {
        return (
            <div>
                <section id="home">
                    <section className="bg-gray">
                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-lg-12 wow fadeIn">
                                    <h1>This is what we are</h1>
                                    <hr className="colored"/>
                                    <p>This is a site for creating unique articles. You can create your own articles on
                                        it.</p>
                                    <p>Whether it's a scientific article or just your blog, we'll post any information
                                        on our
                                        site.</p>
                                </div>
                            </div>
                            <div className="row text-center content-row">
                                <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".2s">
                                    <div className="about-content">
                                        <i className="fa fa-laptop fa-4x"/>
                                        <h3>IT Blogs</h3>
                                        <p>Our site really appreciates IT.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".4s">
                                    <div className="about-content">
                                        <i className="fa fa-subway fa-4x"/>
                                        <h3>Travel</h3>
                                        <p>Share your best travels on your articles.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".6s">
                                    <div className="about-content">
                                        <i className="fa fa-camera-retro fa-4x"/>
                                        <h3>Photography</h3>
                                        <p>Create such beautiful articles as photos of famous artists in their famous
                                            years</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".8s">
                                    <div className="about-content">
                                        <i className="fa fa-paint-brush fa-4x"/>
                                        <h3>Life style</h3>
                                        <p>Your article can be on any topic, about every detail of your life, about your
                                            pleasures
                                            and preferences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="services">
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-lg-12 wow fadeIn">
                                    <h2>Create your article</h2>
                                    <hr className="colored"/>
                                    <p>Here is an overview of how you can create your owm article.</p>
                                </div>
                            </div>
                            <div className="row content-row">
                                <div className="col-md-4 wow fadeIn" data-wow-delay=".2s">
                                    <div className="media">
                                        <div className="pull-left">
                                            <i className="fa fa-clipboard"/>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="media-heading">Think</h3>
                                            <ul>
                                                <li>Conceive article</li>
                                                <li>Imagine article</li>
                                                <li>Realize article</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 wow fadeIn" data-wow-delay=".4s">
                                    <div className="media">
                                        <div className="pull-left">
                                            <i className="fa fa-pencil"/>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="media-heading">Create</h3>
                                            <ul>
                                                <li>Create article</li>
                                                <li>Unique style</li>
                                                <li>Do your best</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 wow fadeIn" data-wow-delay=".6s">
                                    <div className="media">
                                        <div className="pull-left">
                                            <i className="fa fa-rocket"/>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="media-heading">Send</h3>
                                            <ul>
                                                <li>Deploy to our website</li>
                                                <li>Get likes</li>
                                                <li>Rise up in rank</li>
                                                <li>Become famous</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="cta-form bg-dark">
                    <div className="container text-center">
                        <h3>Sign up to create your own article!</h3>
                        <hr className="colored"/>
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <div id="mc_embed_signup">
                                    <form role="form" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                                          target="_blank" noValidate>
                                        <div className="input-group input-group-lg">
                                            <input type="email" name="EMAIL" className="form-control" id="mce-EMAIL"
                                                   placeholder="Email address..."/>
                                            <span className="input-group-btn">
                                                <Link to="/signup" id="mc-embedded-subscribe"
                                                      className="btn btn-primary">Sign up</Link>
                                             </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}