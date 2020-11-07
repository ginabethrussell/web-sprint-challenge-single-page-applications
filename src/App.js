import React, {useState, useEffect} from "react";
import{NavLink, Route} from 'react-router-dom';
import Home from './components/Home';
import Pizza from './components/Pizza';
import axios from 'axios';

const App = () => {
  const [order, setOrder]= useState('');
  
  const placeOrder = (newOrder)=> {
    console.log('order', newOrder);
    setOrder(newOrder);
  };

  useEffect(() => {
    console.log(order);
    axios
    .post("https://reqres.in/api/users", order)
    .then(response => {
      // update temp state with value to display
      console.log(response);

      // clear state, could also use 'initialState' here
      setOrder('');
    })
    .catch(err => {
      // this is where we could create a server error in the form!
      console.log("oops! something happened!");
    });
}, [order]);

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
    <Route path='/pizza' render={() => <Pizza placeOrder={placeOrder}/> }/>
    </div>
  );
};
export default App;
