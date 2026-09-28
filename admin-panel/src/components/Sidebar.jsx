import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="container bg-light border-right p-3">
      <h5 className="mb-4">Menü</h5>
      <ul className='nav flex-column'>
           <li className="nav-item">
            <Link className='nav-link' to='/dashboard'>
            Ana Sayfa
            </Link>
           </li>
      </ul>
    </div>
  )
}

export default Sidebar
