import React from 'react'
import SingleResponse from './SingleResponse'
import './Response.css'

function Response({data}) {
  // data.map(d=> console.log(d.id))
  return (
    <div className='response'>
      {data.map(d=> <SingleResponse key = {d.id} responses = {d}/>)}
    </div>
  )
}

export default Response