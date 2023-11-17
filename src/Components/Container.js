import React, { useState } from 'react';
import './Container.css';
import Dictionary from './Dictionary';
import Contact from './Contact';
import { Link ,BrowserRouter as Router , Routes ,Route } from 'react-router-dom';

const Container = () => {
  let dict;
  const [data , setData] = useState('');

  const dictioanryData = async (e) =>{
    try{
    let word =  e.target.parentElement.querySelector('[name="search"]').value;
    let response = await fetch( `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if(!response.ok){
      throw new Error ('Network response was not okay');
    }
    const data = await response.json();
    setData(data);
    console.log(data)
    
    }
    catch(error){
      console.error('error fetching data',error.message);
    }
  }

    return (
       <Router>
        <div className="container-fluid back-design">
       <div className='container '>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
             <div className="container-fluid navs">
    <img  src='dictionary2.png' width='40px' height='40px'/><Link className="navbar-brand " to='/' >&emsp;Dictionary</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </a>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><Link className="dropdown-item" to="/" >Home</Link></li>
            <li><Link className="dropdown-item" to='/Contact' >Contact</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Routes>
<Route exact path='/' element = {<Dictionary dict = {dictioanryData} data={data}/>} />
<Route exact path='/Contact' element = {<Contact/>} />
</Routes>
       </div>
        </div>   
  </Router>
    );
}

export default Container;
