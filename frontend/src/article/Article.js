import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            id: props.match.params.id
        };
    }


    componentDidMount() {
        const auth = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`)
            }
        };

        axios.get(`http://127.0.0.1:5000/articles/${this.state.id}`, auth)
            .then(res => {
                const article = res.data['article'];
                this.setState({articles: article});
            })
    }

    render() {
        const it = this.state['articles'][0];
        if (it === undefined) {
            console.log(it);
            return ("Nothing");
        } else {
            console.log(it);
        return (
            <section id="article">
                <div className="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <img src={process.env.PUBLIC_URL + "/assets/img/portfolio/grid/identity/1.jpg"}
                                     className="img-responsive img-centered" alt=""/>
                                <h2 className="text-center">{this.state['articles'][0].name}</h2>
                                <hr className="colored"/>
                                <p >{this.state['articles'][0].text}</p>
                            </div>
                            <div className="col-lg-8 col-lg-offset-2">
                                <ul className="list-inline item-details">
                                    <li>Author:
                                        <strong><a href="https://habr.com/ru/users/magisterludi">MagisterLudi</a>
                                        </strong>
                                    </li>
                                    <li>Date:
                                        <strong><a href="https://habr.com/ru/post/534590">December 2020</a>
                                        </strong>
                                    </li>
                                    <li>Original:
                                        <strong><a href="https://habr.com/ru/post/534590">Link</a>
                                        </strong>
                                    </li>
                                </ul>
                                <Link to="/articles" type="button" className="btn btn-default"
                                      data-dismiss="modal"><i className="fa fa-times"/> Back to Articles </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
        }
    }
}