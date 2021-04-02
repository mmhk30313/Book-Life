import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext } from "react";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import Admin from "./Components/Admin/Admin";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [allUsersBooks, setAllUsersBooks] = useState([]);
  useEffect(()=>{
    fetch('https://book-life-server.herokuapp.com/allBooks')
    .then(res => res.json())
    .then(data => setBooks(data))
    // const newBooks = fakeData;
    // setBooks(newBooks);
  }, []);
  // console.log(books);
  return (
    <div className="m-0 p-0">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MyNavbar/>
              <Home/>
            </Route>
            <Route path="/home">
              <MyNavbar/>
              <Home/>
            </Route>
            <Route path="/login">
              <MyNavbar/>
              <Login/>
            </Route>
            {/* Private Route */}
            <PrivateRoute path="/order/:key">
              <MyNavbar/>
              <Orders/>
            </PrivateRoute>
            <Route path='/admin' component={Admin}/>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
