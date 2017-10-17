import React, {Component} from 'react'
import anime from 'animejs'
import '../css/About.css'

// import TabsNav from '../utils/TabsNav'

 


export default class About extends Component {

    // openTabCallback(anim, idx, tab) {


    //     const contentItems = [].slice.call(document.querySelectorAll('.tabscontent > .tabscontent__item'))
    //     const backCtrl = document.querySelector('.tabscontent > button.btn--back')
    //     const menuCtrl = document.querySelector('button.btn--menu')
    //     let isContentShown = false
    //     let current


    //     if( anim.progress > 60 && !isContentShown ) {
    //         isContentShown = true;
    //         current = idx;

    //         var contentItem = contentItems[idx],
    //             content = {
    //                 img: contentItem.querySelector('img.poster__img'),
    //                 title: contentItem.querySelector('.poster__title'),
    //                 deco: contentItem.querySelector('.poster__deco'),
    //                 box: contentItem.querySelector('.poster__box'),
    //                 number: contentItem.querySelector('.poster__number')
    //             };

    //         // Hide the content elements.
    //         content.img.style.opacity = content.title.style.opacity = content.deco.style.opacity = content.box.style.opacity = content.number.style.opacity = 0;
    //         // Show content item.
    //         contentItem.style.opacity = 1;
    //         contentItem.classList.add('tabscontent__item--current');

    //         // Animate content elements in.
    //         anime.remove([content.img, content.title, content.box, content.number, content.deco]);
    //         anime({
    //             targets: [content.img, content.title, content.box, content.number, content.deco],
    //             easing: 'easeOutExpo',
    //             duration: function(t,i) {
    //                 return 600 + i*100;
    //             },
    //             scaleX: function(t,i) {
    //                 return i === 0 ? [0,1] : 1;
    //             },
    //             translateX: function(t,i) {
    //                 return [-80-i*150,0];
    //             },
    //             rotate: function(t,i) {
    //                 return i === 2 ? [-40,0] : 0;
    //             },
    //             opacity: {
    //                 value: 1,
    //                 duration: 300,
    //                 easing: 'linear'
    //             }
    //         });
    //     }
    // }
    
    
    // closeTabs(tnav, contentItems, current, isContentShown, backCtrl, menuCtrl) {
    //     if( !tnav.isOpen ) return;

    //     const contentItem = contentItems[current],
    //         content = {
    //             img: contentItem.querySelector('img.poster__img'),
    //             title: contentItem.querySelector('.poster__title'),
    //             deco: contentItem.querySelector('.poster__deco'),
    //             box: contentItem.querySelector('.poster__box'),
    //             number: contentItem.querySelector('.poster__number')
    //         };

    //     // Hide the content elements.
    //     anime.remove([content.img, content.title, content.box, content.number, content.deco]);
    //     // Animate content elements out.
    //     anime({
    //         targets: [content.deco, content.number, content.box, content.title, content.img],
    //         easing: 'easeInOutCubic',
    //         duration: function(t,i) {
    //             return 600 + i*100;
    //         },
    //         delay: function(t,i,c) {
    //             return (c-i-1)*35;
    //         },
    //         translateX: function(t,i) {
    //             return [0,-200-i*150];
    //         },
    //         rotate: function(t,i) {
    //             return i === 2 ? [0,-40] : 0;
    //         },
    //         opacity: {
    //             value: 0,
    //             duration: 450
    //         },
    //         update: function(anim) {
    //             if( anim.progress > 20 && isContentShown ) {
    //                 isContentShown = false;
    //                 // Close tab.
    //                 tnav.close();
    //             }
    //         },
    //         complete: function() {
    //             // Hide content item.
    //             contentItem.style.opacity = 0;
    //             contentItem.classList.remove('tabscontent__item--current');
    //         }
    //     });

    //     // Hide back ctrl
    //     anime.remove(backCtrl);
    //     anime({
    //         targets: backCtrl,
    //         duration: 800,
    //         easing: 'easeOutExpo',
    //         scale: [1,0],
    //         opacity: {
    //             value: 0,
    //             duration: 200,
    //             easing: 'linear'
    //         }
    //     });
    // }
    // toggleTabs(tnav, menuCtrl) {
        
    //     var state = tnav.toggleVisibility();
    //     if( state === 0 ) {
    //         menuCtrl.classList.remove('btn--menu-active');
    //     }
    //     else if( state === 1 ) {
    //         menuCtrl.classList.add('btn--menu-active');
    //     }
    // }

    // componentDidMount(){
        
    //     const contentItems = [].slice.call(document.querySelectorAll('.tabscontent > .tabscontent__item'))
    //     const backCtrl = document.querySelector('.tabscontent > button.btn--back')
    //     const menuCtrl = document.querySelector('button.btn--menu')
    //     const isContentShown = false
    //     let current
    //     const nav = document.querySelector('.tabsnav')

    //     const tnav = new TabsNav(nav, {
    //             movable: 'all',
    //             extramovable: '.content',
    //             layout: 'vertical',
    //             animeduration: 700,
    //             animeeasing: 'easeInOutCubic',
    //             animedelay: 100,
    //             onOpenBarsUpdate: this.openTabCallback,
    //             onOpenTab: function() {
    //                 // Show the back button after the tab is open.
    //                 anime({
    //                     targets: backCtrl,
    //                     duration: 800,
    //                     easing: 'easeOutExpo',
    //                     scale: [0,1],
    //                     opacity: {
    //                         value: 1,
    //                         duration: 300,
    //                         easing: 'linear'
    //                     }
    //                 });
    //             }
    //         })
    //         console.log(tnav)
    
    //     backCtrl.addEventListener('click', this.closeTabs(tnav, contentItems, current, isContentShown, backCtrl, menuCtrl))
    //     menuCtrl.addEventListener('click', this.toggleTabs(tnav, menuCtrl))
    // }
    
           
    

    render() {
        
                return (
                    <div id="About" className="About demo-2">
 
                        
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