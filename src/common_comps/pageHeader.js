import React from 'react';

function PageHeader(props){
  return(
    <div>
      <h1 className="text-center my-5">{props.title}</h1>
    </div> 
  )
}

export default PageHeader