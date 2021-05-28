import React, {Component} from "react";

export default class CreateArticle extends Component {
    handleTitleChange(e) {
        this.setState({name: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleOnClick() {
        if(this.state.name !== undefined && this.state.text !== undefined ){
            const auth = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            },
            body: JSON.stringify({
                'name': this.state.name,
                'text': this.state.text
            })
        };

        console.log(localStorage.getItem('email'));
        console.log(localStorage.getItem('password'));

        fetch(`http://127.0.0.1:5000/articles`, auth)
            .then(response => {
                const contentType = response.headers.get('content-type');
                this.setState({status: response['status']});
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No json. Notify backend!");
                }
                return response.json();
            }).then(data => {
            console.log(data);
        }).catch((e) => {
            console.log(e);
        });
        }
    }

    render() {

        return (
            <section id="contact">
                <div className="container wow fadeIn">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Create article</h2>
                            <hr className="colored"/>
                        </div>
                    </div>
                    <div className="row content-row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form name="sentMessage" id="contactForm" noValidate>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Title</label>
                                        <input type="text" className="form-control" placeholder="Name" id="name"
                                               required data-validation-required-message="!!!Wow!!!"
                                               onChange={this.handleTitleChange.bind(this)}/>
                                        <p className="help-block text-danger"/>
                                    </div>
                                </div>

                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Text</label>
                                        <textarea rows="5" className="form-control" placeholder="Message" id="message"
                                                  required data-validation-required-message="!!!Amazing!!!"
                                                  onChange={this.handleTextChange.bind(this)}/>
                                        <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <br/>
                                <div id="success"/>
                            </form>
                            <div className="row">
                                <div className="form-group col-xs-12">
                                    <button type="submit" className="btn btn-outline-dark"
                                            onClick={this.handleOnClick.bind(this)}>
                                        Send
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
