import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiSer';
import PageHeader from './common/pageHeader';

function UserInfo(props){
  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL + "/users/userInfo"
    // GET -> in a get request there is no need to pass the body to the ƒunc
    let data = await doApiMethod(url,"GET");
    console.log(data);
    data.dateCreated = data.createdAt.substr(0,data.createdAt.indexOf("T"));
    // data.dateCreated = new Date(userInfo.createdAt).toDateString();
    setUserInfo(data);
  }

  return(
    <div>
      <PageHeader title="Info about your user:"/>
      <div>
        <h4 className="h5">Name: {userInfo.name}</h4>
        <h4 className="h5">Email: {userInfo.email}</h4>
        <h4 className="h5">Sign up data: {userInfo.dateCreated}</h4>
      </div>
    </div> 
  )
}

export default UserInfo