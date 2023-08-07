import React from 'react'
import { error } from '../../assets'

import './Error.scss'

const Error = () => {
  return (
    <div className="error">
      <div className="error_image">
        <img src={error} alt="error" />
      </div>
    </div>
  )
}

export default Error