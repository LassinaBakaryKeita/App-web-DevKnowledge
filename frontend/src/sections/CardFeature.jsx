import React from 'react'
import './CardFeature.css'

export default function CardFeature({title,subtitle}) {
  return (
    <div className='card'>
        <h3>{title}</h3>
        <p>{subtitle}</p>
    </div>
  )
}


