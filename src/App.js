import React, { Component } from 'react'
import Navbar from './Navbar'
import News from './News'

import {  // React router dom
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

// 931671572e914878af3954b3e9b042f8

export class App extends Component {
  pageSize = 6;
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Here, we have to provide a unique key to the components, otherwise it assumes that the component which
            we are requesting is already mounted, so it does not rerender the component, and the page content remains same */}
            <Route exact path='/' element={<News key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route exact path='/sports' element={<News key='sports' pageSize={this.pageSize} country='in' category='sports' />}></Route>
            <Route exact path='/business' element={<News key='business' pageSize={this.pageSize} country='in' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
            <Route exact path='/science' element={<News key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
            <Route exact path='/health' element={<News key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
            <Route exact path='/technology' element={<News key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App