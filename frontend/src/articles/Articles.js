import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
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

        axios.get(`http://127.0.0.1:5000/articles`, auth)
            .then(res => {
                const articles = res.data['articles'];
                this.setState({articles});
            })
    }

    generate() {
        var number = Math.floor(Math.random() * 3);
        let style;
        switch (number) {
            case 0:
                number = Math.floor(Math.random() * 3) + 1;
                style = "identity";
                break;
            case 1:
                number = Math.floor(Math.random() * 4) + 1;
                style = "web";
                break;
            case 2:
                number = Math.floor(Math.random() * 5) + 1;
                style = "graphic";
                break;
        }
        return style + '/' + number;
    }

        render()
        {
            console.log(this.state['articles']);

            const articlesList = this.state['articles']
                .map((i) =>
                    <Link to={`/articles/${i.id}`} key={i.id}>
                        <div className="portfolio web mix_all" data-cat="web" data-toggle="modal"
                             style={{display: 'inline-block'}}>
                            <div className="portfolio-wrapper">
                                <img src={process.env.PUBLIC_URL + `/assets/img/portfolio/grid/${this.generate()}.jpg`} alt=""/>
                                <div className="caption">
                                    <div className="caption-text">
                                        <a className="text-title">${i.name}</a>
                                        <span className="text-category">Brand Identity</span>
                                    </div>
                                    <div className="caption-bg"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                );

            return (
                <div>
                    <section id="home">
                        <div className="container text-center wow fadeIn">
                            <h2>Articles</h2>
                            <hr className="colored"/>
                            <p>Here are top articles that we've.</p>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div id="portfoliolist">
                                        {articlesList}
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