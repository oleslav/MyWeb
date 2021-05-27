import React, {Component} from "react";

export default class Contact extends Component {
    render() {
        return (
            <section id="contact">
                <div className="container wow fadeIn">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Contact Me</h2>
                            <hr className="colored"/>
                            <p>If you have problems or offers. Please send us your email. We will contact you.</p>
                        </div>
                    </div>
                    <div className="row content-row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form name="sentMessage" id="contactForm" noValidate>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Name</label>
                                        <input type="text" className="form-control" placeholder="Name" id="name"
                                               required data-validation-required-message="Please enter your name."/>
                                            <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Email Address"
                                               id="email" required
                                               data-validation-required-message="Please enter your email address."/>
                                            <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Phone Number</label>
                                        <input type="tel" className="form-control" placeholder="Phone Number" id="phone"
                                               required
                                               data-validation-required-message="Please enter your phone number."/>
                                            <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Message</label>
                                        <textarea rows="5" className="form-control" placeholder="Message" id="message"
    required data-validation-required-message="Please enter a message."/>
                                        <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <br/>
                                    <div id="success"/>
                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button type="submit" className="btn btn-outline-dark">Send</button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    );
    }
}