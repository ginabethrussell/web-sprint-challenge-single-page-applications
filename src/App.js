import React, {useState, useEffect} from "react";
import{NavLink, Route} from 'react-router-dom';
import Home from './components/Home';
import Pizza from './components/Pizza';
import axios from 'axios';

const App = () => {
  const [order, setOrder]= useState({
    name: '',
    size: '',
    pepperoni: '',
    sausage: '',
    onions: '',
    mushroom: '',
    instructions: ''});
  

  return (
    <div className='container'>
      <div className="header">
        <h1>Lambda Eats</h1>
        <div className='navlinks'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/help'>Help</NavLink>
        </div>   
      </div>
      <Route exact path='/' component={Home} />
    <Route path='/pizza' render={() => <Pizza /> }/>
    </div>
  );
};
export default App;
