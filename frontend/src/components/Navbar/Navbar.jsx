import React from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './Navbar.scss'
import { Logo } from '../../assets';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'



const Navbar = () => {

    const [toggle, setToggle ] = useState(false)
  
  
    return (
      <nav className='navbar'>
        <div className='navbar-logo'>
          <img src={Logo} alt="logo" />
        </div>
        <ul className='navbar-links'>
          {['Home', 'Recipes', 'About'].map((items) =>
          <li className='app__center' key={`link-${items}`}>
            <div />
            <NavLink to={`/${items}`} > {items} </NavLink>
          </li>
          )}
        </ul>
  
        <div className='navbar-menu'>
         <HiMenuAlt4 onClick={()=>setToggle(true)} />
         {toggle &&(
          <motion.div 
          whileInView={{x: [300,0]}}
          transition={{duration: 1, ease:'easeOut'}}
          >
            <HiX onClick={()=>setToggle(false)} />
            <ul>
            {['Home', 'Recipes', 'About'].map((items) =>
          <li key={items}>
            <NavLink to={`/${items}`} onClick={()=>setToggle(false)}  > {items} </NavLink>
          </li>
          )}
          </ul>
          </motion.div>
          )}
        </div>
      </nav>
    )
  }
  
  export default Navbar
