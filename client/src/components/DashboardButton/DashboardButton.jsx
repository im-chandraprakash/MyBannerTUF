import React from 'react'
import {Link} from 'react-router-dom';
import './DashboardButton.scss'

function DashboardButton({Name , url}) {
  return (
    <div className='dashboard-section'>
        <div className='dashboard-button'>
            <Link className='btn-primary' to={url}>
                {Name}
            </Link>
        </div>
    </div>
  )
}

export default DashboardButton