import React from 'react';

function PageHeader(props){
  return(
    <div className="my-4">
      <h1>
      {props.title}</h1>
    </div> 
  )
}

export default PageHeader