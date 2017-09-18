import React, { Component } from 'react'

import '../css/Portfolio.css'
import { CSSGrid, measureItems, makeResponsive, layout, enterExitStyle } from 'react-stonecutter';

const { simple, pinterest } = layout;
const { enter, entered, exit } = enterExitStyle.foldUp;


class VideoBrick extends Component {
    render(){
        return (
            <div className="portfolio_grid__item">    
                <img className="portfolio_grid__img" src={this.props.video.pictures.sizes[2].link} />
            </div>
        )
       
    }
}
  

export default class Portfolio extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: []
        }
    }
    componentDidMount() {
        // console.log(this.state.videos)
        console.log(localStorage.getItem('videos'))
        // this.setState({videos: JSON.parse(localStorage.getItem('videos'))})
        
    }
    componentWillMount() {
        

    }
   
  

    render() {
        const portfolio_styles = {
            paddingTop: '100px'
        }
  
        const Grid = measureItems(CSSGrid, {measureImages: true});
     
            
            return (
                <div className="Portfolio" style={portfolio_styles}>
                    <Grid
                        className="Grid"
                        columns={4}
                        columnWidth={300}
                        gutterWidth={20}
                        gutterHeight={10}
                        component='div'
                        enter={enterExitStyle.foldUp.enter}
                        entered={enterExitStyle.foldUp.entered}
                        exit={enterExitStyle.foldUp.exit}
                        layout={layout.pinterest}
                        duration={800}
                        easing="ease-out">
                        
                         {this.props.videos.map((video) => (
                            <div className="portfolio_grid__item">    
                                <img className="portfolio_grid__img" src={video.pictures.sizes[2].link} />
                            </div>
                         )
                         )}
                                        
                    </Grid>
                    
                </div>
    
            )
        } 
       
    
}