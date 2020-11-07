import React from "react";
import{NavLink, Route} from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <div className='container'>
      <div className="header">
        <h1>Lambda Eats</h1>
        <div className='navlinks'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/help'>Help</NavLink>
        </div>   
      </div>
      <Route path='/' component={Home} />
    </div>
  );
};
export default App;
