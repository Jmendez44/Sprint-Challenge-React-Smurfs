import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  withRouter
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
    
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  

  componentDidMount(){
    console.log('cdm running');

   axios
       .get('http://localhost:3333/smurfs')
       .then(res => {
           console.log(res);
           this.setState({ smurfs: res.data });
         })
         .catch(err => {
           console.log(err);
           this.setState({ error: err });
         });
  }






  render() {
    console.log(this.state.smurfs);
    return (
      <div className="App">
        <nav>
          <h1 className="store-header">React Smurfs</h1>
          <div className="nav-links">

            <NavLink exact to="/">
              Smurf's
            </NavLink>
            <NavLink to="/smurf-form">Add Smurf</NavLink>
          </div>
        </nav>

        <Route 
        path="/smurf-form"
        render={props => <SmurfForm {...props} addSmurf={this.addSmurf} key={this.state.smurfs.id} />}
        />  

        {/* <SmurfForm {...this.state} addSmurf={this.addSmurf} key={this.state.smurfs.id} /> */}


        <Route 
        exact path="/"
        render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        
        



        
      </div>
    );
  }
}

export default App;
