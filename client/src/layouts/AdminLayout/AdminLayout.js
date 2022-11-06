import React from 'react'

const user = null;

export function AdminLayout( props ) {
const { children } = props;

  return (
    <div>
       <h1>AdminLayout</h1> 
       { children }
    </div>
  )
}
