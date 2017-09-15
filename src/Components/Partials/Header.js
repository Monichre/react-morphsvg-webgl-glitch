

import React, { Component } from 'react'

export default class About extends Component {

    render() {

        return (
            <header className="codrops-header">
                <h1 className="codrops-header__title">Cinematography</h1>
                <nav className="demos">
                    <a className="demo" href="index.html"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                    <a className="demo" href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                    <a className="demo" href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    <a className="demo" href="#"><i className="fa fa-vimeo" aria-hidden="true"></i></a>
                </nav>
            </header>
        );
    }
}