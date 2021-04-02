import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import fakeData from '../FakeData/fakeData';
import './Home.css';
import ShowBook from '../ShowBooks/ShowBook';
import { UserContext } from '../../App';
const Home = () => {
    const [loggedInUser, setLoggedInUser, books] = useContext(UserContext);
    
    // console.log(books);
    if(false){
        console.log(loggedInUser, setLoggedInUser);
    }
    return (
        <div className="container-fluid">
            <br/>
            <div className="search d-flex mx-auto py-5">
                <input className="form-control search-bar"  type="search" placeholder="Search Book" name="search" id=""/>
                <button className="btn btn-primary" type="submit">Search</button>
            </div>
            {
                !books.length
                && <div className="d-flex justify-content-center mt-5">
                    <CircularProgress color="secondary"/>
                 </div>
            }
            {
                books.length > 0 && <div className="container-fluid row w-100 mx-auto justify-content-center">
                {
                    books.map((book, idx) => <ShowBook key={idx} book={book}/>)
                }
            </div>
            }
        </div>
    );
};

export default Home;