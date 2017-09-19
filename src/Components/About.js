import React, {Component} from 'react'

export default class About extends Component {

    render() {
        
                return (
                    <div className="About">
 
                        
                            <main className="view">
                                <div className="content">
                                    <div className="deco">
                                        <p className="deco__text">To immortalize the deepest realities of <span>The Story</span></p>
                                    </div>

                                    <header className="codrops-header">
                                        <p className="codrops-header__info">The straight up<br/>freshest vids<br/>I got</p>
                                        <span className="codrops-header__deco">hitherto</span>
                                        <h1 className="codrops-header__title">unseen</h1>
                                        <p className="codrops-header__tagline">peep the show</p>

                                    </header>
                                </div>

                                <button className="btn btn--menu">
                                    <svg className="icon icon--menu"></svg>
                                    <svg className="icon icon--cross"></svg>
                                </button>

                                <nav className="tabsnav tabsnav--vertical tabsnav--ander">
                                    <div className="tabsnav__item">
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Shooting</h3>
                                    </div>
                                    <div className="tabsnav__item">
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Editing</h3>
                                    </div>
                                    <div className="tabsnav__item">
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Production</h3>
                                    </div>

                                </nav>
                                <div className="tabscontent">
                                    <div className="tabscontent__item">
                                        <figure className="poster">
                                                <img className="poster__img" src="img/mpls.jpg" />
                                                <figcaption className="poster__caption">
                                                    <h2 className="poster__title">Cinema<br/>style</h2>
                                                    <p className="poster__deco">professional video equipment</p>
                                                    <div className="poster__box"></div>
                                                    <span className="poster__number">unparalleled</span>
                                                </figcaption>
                                        </figure>
                                    </div>
                                    <div className="tabscontent__item">
                                        <figure className="poster">
                                            <img className="poster__img" src="img/streetlight.jpg" />

                                            <figcaption className="poster__caption editing">

                                                <h2 className="poster__title">color<br/>grading</h2>
                                                <p className="poster__deco">professional software and effects</p>
                                                <div className="poster__box"></div>
                                                <span className="poster__number">sound <br/> design</span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className="tabscontent__item">
                                        <figure className="poster">
                                            <img className="poster__img" src="img/camera_2.jpg" />
                                            <figcaption className="poster__caption">

                                                <h2 className="poster__title">scripts<br/>locations</h2>
                                                <p className="poster__deco">shot lists</p>
                                                <div className="poster__box"></div>
                                                <span className="poster__number">Preproduction</span>
                                            </figcaption>
                                        </figure>
                                    </div>


                                    <button className="btn btn--back">
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </main>
                        </div>
                );
            }
}