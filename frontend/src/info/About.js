import React, {Component} from 'react'

export default class About extends Component {
    render() {
        return (
            <section id="about">
                <div className="container wow fadeIn">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={process.env.PUBLIC_URL + "/assets/img/creative/about.jpg"}
                                 className="img-responsive" alt=""/>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1>Hi, It's Vitality Articles</h1>
                            <hr className="colored"/>
                            <p>This is a site for creating unique articles. You can create your own articles on
                                it.</p>
                            <p>Whether it's a scientific article or just your blog, we'll post any information on
                                our site.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}