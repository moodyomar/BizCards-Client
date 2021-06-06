import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';
import { getUserData } from '../../services/userSer';

function ProtectedRoute(props) {
  let history = useHistory();

  const checkTokenUser = async () => {
    let data = await checkIfUser()
    console.log(data);

// בדיקה אם במקרה קיבלנו את הפרופס ביז 
    // שאומר שהראוט הנל לא מספיק להיות רק רשום
    // אלא המשתמש חייב להיות עסק
    if(props.bizRoute){
      // כדי לבדוק אם המשתמש הוא ביז
      // חייב לשלוף את המידע קודם מהסרבס
      let user = getUserData();
      if(!user.biz){
        toast.warning("You must be business");
        history.push("/");
      }
    }

    // if all good , status w'll be recived
    if (!data.status) {
      // toast.error("zzzz"); // this msg is shows when login out aswell
      // delete token if invalid
      localStorage.removeItem("tok");
      history.push("/login");
    }
  }

  return (
    <Route exact path={props.path}
      render={() => {
        // check if user loggen in , other wise send to login pg
        checkTokenUser();
        return (<props.comp {...props} />);
      }} />
  )
}

export default ProtectedRoute;