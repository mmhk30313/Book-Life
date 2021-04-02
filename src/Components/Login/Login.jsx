import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import google from '../../images/icons/Group 573.png';
import "firebase/auth";
import firebase from "firebase/app";
// import * as firebase from "firebase/app";
import firebaseConfig from '../firebase.config/firebase.config';
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig);
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const history = useHistory();
    const location = useLocation()
    const {from} = location.state || { from: { pathname: "/"}};
    const handleClick = () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            // console.log(user);
            const {displayName, email, photoURL} = user;
            const myUser = {
                email,
                displayName,
                photoURL
            }
            setLoggedInUser(myUser);
            history.replace(from);
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage, loggedInUser);
        });
    }
    return (
        <div className="jumbotron shadow bg-light mx-auto rounded d-flex justify-content-center p-5" style={{width:'420px', marginTop: '145px'}}>
            <button onClick={handleClick} className="btn btn-outline-warning w-100 mx-auto" style={{borderRadius: '30px'}} ><img src={google} alt="" style={{height: '25px'}} /> Continue With Google</button>
        </div>
    );
};

export default Login;