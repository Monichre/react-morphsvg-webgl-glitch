import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Components/Home'
import Portfolio from './Components/Portfolio'
import About from './Components/About'
import Contact from './Components/Contact'
import Header from './Components/Partials/Header'
import './App.css';

const Vimeo = require('vimeo').Vimeo;
const clientID = 'a403a67f112f44d9826223d299688cffcdc4c794';
const clientSecret = '4ddwI9d7nHrcRcPlM5UE4YyNTZ9yjCCthnz+9CwY4Hdg5JkaYrOWRu24kgmnq6qmkDXNZ2EejDZ6ZmgmGM6pmMX+m02NeAPx4fty7Dc5rMCwIT1iZ/+T5Goz0xx4aoFV';
const accessToken = '827ba89c1ca4647189da72d793d669b5';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeLoader: false,
      videos: []

    }

  }

  componentWillMount() {
    const lib = new Vimeo(clientID, clientSecret, accessToken);
    let videos = [];

    lib.request({
        path: '/me/videos'
    }, (err, body, status_code, headers) => {
        if (!err) {
            videos = body.data;
            localStorage.setItem('videos', JSON.stringify(videos))
            this.setState({ videos: videos })
            console.log(videos);
        } else {
            console.log(err);
        }

    })
  }
  componentDidMount() {

  }

  render() {
   
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/portfolio'  render={() => <Portfolio videos={this.state.videos}/> }/>
          <Route exact path='/contact' component={Contact} />

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
