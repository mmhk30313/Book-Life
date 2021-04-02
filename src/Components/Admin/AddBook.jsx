import React, { useContext, useRef } from 'react';
import { UserContext } from '../../App';
import uploadIcon from '../../images/icons/cloud-upload-outline 1.png';

const AddBook = () => {
    const [loggedInUser, setLoggedInUser, books] = useContext(UserContext);
    const nameRef = useRef();
    const authorRef = useRef();
    const priceRef = useRef();
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const bookName = evt.target.bookName.value;
        const authorName = evt.target.authorName.value;
        const bookPrice = evt.target.bookPrice.value;
        // console.log(bookName, authorName, bookPrice);
        // console.log(evt.target.file.files[0]);
        const imgData = new FormData();
        imgData.set("key", "4ddc64c369e800157d688eb222ce91af");
        imgData.append('image', evt.target.file.files[0]);

        fetch("https://api.imgbb.com/1/upload", {
            method: 'POST',
            body: imgData,
            // If you add this, upload won't work
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data.data.display_url);
            const bookDetails = {
                bookName,
                authorName,
                bookPrice,
                imgUrl: data.data.display_url
            }
            console.log(bookDetails);
            fetch('https://book-life-server.herokuapp.com/addBook', {
                method: "POST",
                body: JSON.stringify(bookDetails),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // setBooks(data);
                nameRef.current.value = null;
                authorRef.current.value = null;
                priceRef.current.value = null;
                alert("Welcome!!! your book is uploaded")
            })
            .catch(err => console.log(err, loggedInUser, setLoggedInUser, books));
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <h4 className="mt-5 ml-2">Add Book</h4>
                <div className="input-form p-3">
                    <form onSubmit={handleSubmit} className="card shadow py-3 px-4" id="useForm">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>Book Name</label>
                                <input ref={nameRef} type="text" className="form-control" placeholder="Enter Name" name="bookName" required />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Author Name</label>
                                <input ref={authorRef} type="text" className="form-control" placeholder="Enter Author" name="authorName" required />
                            </div>
                            <br/><br/>
                            <div className="col-md-6 form-group">
                                <label>Add Price</label>
                                <input ref={priceRef} type="text" className="form-control" placeholder="Enter Price" name="bookPrice" required />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Add Book Cover Photo</label>
                                <input type="file" name="file" className="d-none" id="upload-file" required/><br/>
                                <label className='btn btn-outline-success  form-control overflow-hidden' id="upload-label" htmlFor="upload-file" style={{width: 'fit-content'}} title='Upload image'><img style={{height: '30px'}} src={uploadIcon} alt=""/> <span className='image-upload'>Upload image</span></label>
                            </div>
                        </div>
                    </form>
                <div className='d-flex'>
                    <input className="btn btn-primary my-3 ml-auto px-4" type="submit" form="useForm" value="Save"/>
                </div>
            </div>
        </>
    );
};

export default AddBook;