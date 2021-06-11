import React, { useEffect, useState } from 'react';
import PageHeader from './common/pageHeader';
import CardsList  from './cardsList';
import { API_URL, doApiGet } from '../services/apiSer';
import Pagenation from '../common_comps/pagenation';


function Home(props){

let [cards_ar,setCards_ar] = useState([])


useEffect(() => {
// query string option for the number of the page we are at
const quries = new URLSearchParams(window.location.search);
let page = quries.get("page") ? quries.get("page")-1 : 0;
let url = API_URL+"/cards?reverse=yes&page="+page;
doApi(url);
},[props.location])

const doApi = async(url) => { 
  let data = await doApiGet(url);
  setCards_ar(data);
}

  return(
    <div>
      <PageHeader title="Welcome to home page" />
   {/*  urlOfItemNum-> url that will return the amout of quiries
      linkTo -> url in client side that will send him each button
      */}
      <Pagenation urlOfItemNum="/cards/totalCards" linkTo="/?page="   />
      <CardsList ar={cards_ar} />
    </div> 
  )
}

export default Home