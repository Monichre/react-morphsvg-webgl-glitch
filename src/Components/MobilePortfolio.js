import React, {Component} from 'react'


export default class MobilePortfolio extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render(){
        return (

        <div id="MobilePortfolio" className="elements">
            <div className="container">
                {this.props.videos.map((video, index) => {
                    return (
                        <div className="slide index1">
                            <video id="prog" height="310" muted="muted" loop="loop">
                                <source src={video.files[4].link} type="video/mp4"/>
                            </video>
                        </div>
                    )
                })}
                
              
            </div>
            <div className="description">
                <div className="description__country"><span>La Crusc, Italy</span>
                <svg className="italy" viewbox="0 0 35 23">
                    <rect width="12" height="23" fill="#3D9348"></rect>
                    <rect x="23" width="12" height="23" fill="#D80031"></rect>
                </svg>
                </div>
                <div className="description__country hide"><span>Paris, France</span>
                <svg className="france" viewbox="0 0 35 23">
                    <rect x="-0.1" width="12" height="23" fill="#323E95"></rect>
                    <rect x="23" width="12" height="23" fill="#D80031"></rect>
                </svg>
                </div>
                <div className="description__country hide"><span>Hong Kong, China</span>
                <svg className="china" viewbox="0 0 35 23">
                    <g>
                    <rect width="35" height="23" fill="#CB1D23"></rect>
                    <polygon points="4,8.9 4.7,6.6 2.8,5.2 5.2,5.2 5.9,2.9 6.7,5.2 9.1,5.2 7.1,6.6 7.8,8.9 5.9,7.5 	" fill="#F7DE29"></polygon>
                    <polygon points="10.7,10.1 11.5,10.4 12,9.8 12,10.6 12.8,11 11.9,11.2 11.9,12 11.4,11.3 10.6,11.5 11.1,10.8 	" fill="#F7DE29"></polygon>
                    <polygon points="15,5.7 14.2,5.6 13.8,6.3 13.6,5.5 12.8,5.3 13.6,4.9 13.4,4.1 14.1,4.7 14.8,4.3 14.4,5.1 	" fill="#F7DE29"></polygon>
                    <polygon points="13.2,9.6 13.5,8.8 12.8,8.3 13.6,8.3 13.9,7.4 14.2,8.3 15.1,8.3 14.4,8.8 14.6,9.6 13.9,9.1 	" fill="#F7DE29"></polygon>
                    <polygon points="10.7,2 11.5,2.4 12.1,1.8 12,2.6 12.8,3 11.9,3.2 11.8,4 11.4,3.3 10.5,3.4 11.1,2.8 	" fill="#F7DE29"></polygon>
                    </g>
                </svg>
                </div>
                <div className="description__country hide"><span>Thx for watching</span>
                <svg className="china" viewbox="0 0 35 23"><a xlinkHref="" target="_blank">
                    <path d="M31.3,2.7c-1,0.5-2.2,0.8-3.3,0.9c1.2-0.7,2.1-1.9,2.6-3.2c-1.1,0.7-2.4,1.1-3.7,1.4C25.8,0.7,24.3,0,22.6,0               c-3.2,0-5.8,2.6-5.8,5.8c0,0.5,0.1,0.9,0.1,1.3C12.1,6.9,7.8,4.6,5,1.1C4.5,1.9,4.2,2.9,4.2,4c0,2,1,3.8,2.6,4.8               c-1,0-1.8-0.3-2.6-0.7c0,0,0,0,0,0.1c0,2.8,2,5.2,4.7,5.7c-0.5,0.1-1,0.2-1.5,0.2c-0.4,0-0.7,0-1.1-0.1c0.7,2.3,2.9,4,5.4,4               c-2,1.6-4.5,2.5-7.2,2.5c-0.5,0-0.9,0-1.4-0.1C5.6,22,8.6,23,11.9,23c10.7,0,16.5-8.8,16.5-16.5c0-0.3,0-0.5,0-0.8               C29.5,4.9,30.5,3.9,31.3,2.7z" fill="#55ACEE"></path></a></svg>
                </div>
                <div className="description__line"></div>
                <div className="description__text"><span>How about you explore cultural events in La Crusc?</span></div>
                <div className="description__text hide"><span>How about you explore cultural events in Paris?</span></div>
                <div className="description__text hide"><span>How about you explore cultural events in Hong Kong?</span></div>
                <div className="description__text hide"><span>More demos soon =)</span></div>
            </div>
        </div>
        )
    }

}