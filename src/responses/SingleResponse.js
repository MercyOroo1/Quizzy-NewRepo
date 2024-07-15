import React from 'react'

function SingleResponse({ responses }) {
    console.log(responses)
  return (  
    <div>
      {responses.is_correct !== undefined ? String(responses.is_correct) : ''}
    </div>
  )
}

export default SingleResponse