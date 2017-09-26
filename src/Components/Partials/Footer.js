import React, {Component} from 'react'


export default class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render(){
        const icon_style = {
            color: '#fff',
            fill: '#fff'

        }
        const list_style = {
            listStyleType: 'none',
            color: '#fff'
        }
        const footer_style = {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100%'
        }
        const ul_style = {
            margin: '0px',
            listStyleType: 'none',
            color: '#fff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'flex end'
        }
        return (
            <div id="Footer" style={footer_style}>
                <ul style={ul_style}>
                    <li>
                        <a href="" style={icon_style}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill='#fff' className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="" style={icon_style}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}