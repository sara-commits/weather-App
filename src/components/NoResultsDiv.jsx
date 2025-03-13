import React from 'react'
import { assets } from '../assets/assets'

const NoResultsDiv = () => {
  return (
    <div className='no-results'>
      <img src={assets.notfound} alt="" className="warning-icon" />
      <h3 className='warning'>City Not Found</h3>
    </div>
  )
}

export default NoResultsDiv
