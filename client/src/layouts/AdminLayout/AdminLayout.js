import React from 'react'

export function AdminLayout( props ) {
const { children } = props;

  return (
    <div>
       <h1>AdminLayout</h1> 
       { children }
    </div>
  )
}
