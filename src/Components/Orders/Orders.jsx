import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Orders = () => {
    const {key} = useParams();
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks] = useContext(UserContext);
    const {email} = loggedInUser;
    // console.log(allUsersBooks);
    function setUserData(){
        fetch(`https://book-life-server.herokuapp.com/user-books?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserBooks(data);
            })
            .catch(err => console.log(err, setLoggedInUser, books, setBooks))
    }
    useEffect(()=>{
        if(key === "all-books"){
            setUserData();
        }
        else{
            const userBook = books.find(book => book._id === key);
            // console.log(userBook);
            const newUserBook = {
                key: key,
                bookName: userBook.bookName,
                authorName: userBook.authorName,
                bookPrice: userBook.bookPrice,
                imgUrl: userBook.imgUrl,
                quantity: 1,
                userEmail: loggedInUser.email
            }
            const userBookForId = allUsersBooks.find(allUsersBook =>  allUsersBook.key === key && allUsersBook.userEmail === loggedInUser.email)
            // console.log(userBookForId);
            let _id;
            if(!userBookForId){
                console.log(('insertion'))
                fetch(`https://book-life-server.herokuapp.com/add-book`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if(data){
                        // console.log(data);
                        setUserData();
                    }
    
                })
                .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
            else{
                console.log("update")
                _id = userBookForId._id;
                fetch(`https://book-life-server.herokuapp.com/user-books/${_id}?email=${email}`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if(data){
                        // console.log(data);
                        setUserData();
                    }
    
                })
                .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
            // console.log(newBook);
        }
    }, [])
    // console.log(key);
    let total = 0;
    for(let i=0;i<userBooks.length;i++){
        total += userBooks[i].quantity * userBooks[i].bookPrice;
    }
    return (
        <div className="container py-5">
            <h2>Checkout</h2>
            <div className="scrolling w-100 mx-auto my-3 card bg-light table-responsive">
                <div className="table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="3" className="text-muted">Description</th>
                                <th scope="col" className="text-center text-muted">Quantity</th>
                                <th scope="col" className="text-center text-muted">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userBooks.map(userBook => <tr key={userBook._id}>
                                    <td colSpan="3">{userBook.bookName}</td>
                                    <td className='text-center'>{userBook.quantity}</td>
                                    <td className='text-center'>${userBook.bookPrice*userBook.quantity}</td>
                                </tr>)
                            }
                            <tr>
                                <td colSpan="4" className="font-weight-bold">Total</td>
                                <td className="font-weight-bold text-center">${total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex">
                <button className="btn btn-primary ml-auto">Checkout</button>
            </div>
        </div>
    );
};

export default Orders;