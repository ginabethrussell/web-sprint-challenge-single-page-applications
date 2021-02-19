import React from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
    return(
        <div className='home-wrapper'>
           <img src="Pizza.jpg" />
           <div className='button-link'>
            <Link to='/pizza'>Pizza</Link>
           </div>
        </div>
    )
}