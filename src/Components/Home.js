import React, { Component } from 'react'
// import '../js/anime.min.js'



    export default class Home extends Component {

    componentWillMount() {
    }
    componentDidMount() {
        
    }

    render() {
        const bg_style = {
            backgroundImage: 'url(img/jud-left.jpg)'
        }

        return (
            <div className="demo-grid">
                <div id="Home" className="Home">

                    <main>
                        <section className="content ">
                           
                            <h2 className="page-title">Portfolio</h2>
                            <nav className="page-nav">
                            <a className="page-nav__item" href="#">The Story</a>
                            <a className="page-nav__item" href="#">Locations</a>
                            <a className="page-nav__item" href="#">Press</a>
                            <a className="page-nav__item" href="#">Tickets</a>
                            <a className="page-nav__item" href="#">Contact</a>
                            <a className="page-nav__item page-nav__item--close" href="#">Back</a>
                        </nav>
                        <div className="pieces" style={bg_style}></div>
                        <h2 className="content__title">Enter</h2>
                            <a className="link link--sponsor" href="#">Public Defender + Videographer</a>
                        </section>
                    </main>

                </div>
            </div>
        );
    }
}