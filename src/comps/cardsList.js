import React, { useEffect, useState } from 'react';
import { getUserData, removeUserFavCard, updateUserAddFavCards } from '../services/userSer';

function CardsList(props) {

  let [userData, setUserData] = useState({})
  let [update, setForceUpdate] = useState(1)

  useEffect(() => {
    setUserData(getUserData)
  }, [])

  const showBtnFav = (item) => {    
    // if by chance the bizz number is in card property of the user
    //  show emptry hart(button) for adding to favorite
    if (!userData.cards.includes(item.bizNumber)) {
      return (
        <button onClick={async () => {
          // update cards array in the user (fav cards)
          await updateUserAddFavCards(item.bizNumber);
          // updating comp state that will force it rerender again
          // and like that it will change the button status in display
          // forceupdate -> func that I made to force an update
          setForceUpdate(update + 1);

        }} className="btn"><i className="fa fa-heart-o fs-2 text-black" aria-hidden="true"></i></button>
      )
    }
    else {
      return (<button onClick={async () => {
        await removeUserFavCard(item.bizNumber)
        setForceUpdate(update + 1);
      }} className="btn"><i className="fa fa-heart fs-2 text-danger" aria-hidden="true"></i></button>)
    }
  }

  return (
    <div className="row">
      {props.ar.map((item) => {
        let bg = item.bizImage?.length > 2 ? item.bizImage : '/images/defaultImg.jpg'
        return (
          <div key={item.bizNumber} className="col-lg-4 p-3">
            <div className="p-2 border">
              <div className="bizImg" style={{ backgroundImage: `url(${bg})` }}></div>
              <article className="p-3">
                <h2>{item.bizName}</h2>
                <p>{item.bizDescription}</p>
                <hr />
                <div><strong>Phone:</strong> {item.bizPhone}</div>
                <div><strong>Address:</strong> {item.bizAddress}</div>
                <div><strong>Biz Number:</strong> {item.bizNumber}</div>
                {userData._id ? showBtnFav(item) :
                  <small className="text text-danger">* log in to add to favorite</small>}
              </article>
            </div>
          </div>
        )
      })}
    </div>

  )
}

export default CardsList