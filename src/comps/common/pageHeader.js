import React from 'react';

function PageHeader({title}){
  return(
<div className='m-5 text-center'>
<h1 style={{marginTop:'100px'}}>{title}</h1>
</div>
  )
}

export default PageHeader