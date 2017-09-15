import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import videos from './utils/api'

import Home from './Components/Home'
import Portfolio from './Components/Portfolio'
import About from './Components/About'
import Contact from './Components/Contact'


import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeLoader: false
    }

  }

  componentWillMount() {


  }
  componentDidMount() {
    // setTimeout(function(){
    // 	document.getElementById('loading').style.display = 'none'
    // }, 1000)



  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/portfolio' component={Portfolio} />
          <Route exact path='/contact' component={Contact} />

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
