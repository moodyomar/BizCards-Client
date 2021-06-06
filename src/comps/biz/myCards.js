import React, { useEffect, useState } from 'react';
import PageHeader from '../common/pageHeader';
import { Link } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../services/apiSer';
import { toast } from 'react-toastify';

function MyCards(props) {

  let [ar, setAr] = useState([])
  useEffect(() => {
    doApi()
  }, [props.location])

  const doApi = async () => {
    let url = API_URL + "/cards/userCardsAdded?perPage=999"
    let data = await doApiMethod(url, "GET")
    setAr(data)

  }

  const delCard = async(_id) => {
    if(window.confirm("Are you sure you want to del?")){
      let url = API_URL+ "/cards/"+_id;
      let data = await doApiMethod(url,"DELETE");
      if(data.n == 1){
        doApi();
        toast.info("Card deleted");
      }
    }
  }

  return (
    <div className="container">
      <PageHeader title="Cards you've added" />
      <Link to="addCard" className="btn btn-success">Add new Biz Card</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone</th>
            <th>edit/del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.bizName}</td>
                <td>{item.bizDescription.substr(0, 40)}...</td>
                <td>{item.bizAddress}</td>
                <td>{item.bizPhone}</td>
                <td>
                <Link to={"/editCard/"+item._id}>
                    <button>edit</button>
                    </Link>
                  <button className="ms-2" style={{ background: "pink" }} onClick={() => {
                      delCard(item._id);
                    }}>del</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MyCards