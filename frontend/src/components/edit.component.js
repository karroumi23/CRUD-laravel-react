import React, { useState, useEffect } from "react"; //useEffect : to upload data one time 
import axios from "axios"; // to send Updates 
import { useNavigate, useParams } from "react-router-dom"; //useNavigate : to redirection
                                                           //useParams : to use id  


export default function EditProduct() {
  const navigate = useNavigate(); //Redirection 
  const { id } = useParams(); //read dynamic parts of the URL (Example : path="/products/:id" ...)

  const [title, setTitle] = useState(''); //title → the current value of the state 
                                          //setTitle → a function to update that value.
                                          //At the beginning: title = '' .
                                          //If you later call: setTitle('New Product');  ==> title = 'New Product'.
                                           
                                          //to use in form : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
   const [description, setDescription] = useState('');
   const [image, setImage] = useState(null);

  //get data 
  useEffect(() => {
    fetchProduct();
  }, [])

  //get the product. //arow fun
  const fetchProduct = async () => {
   await axios.get('http://127.0.0.1:8000/api/products/' + id)
              .then(({ data }) => {
                    const { title, description } = data.product
                    setTitle(title)
                    setDescription(description)
                   
              }).catch(({ response: { data } }) => {
                    console.log(data.message)
              })
  }

  //Locate the file (image) in the array [0,1,2...]
  const changeHandler = (e) => { //(e) === event.
    setImage(e.target.files[0])// first file
  }

  //للتأكد من تحميل البيانات بالكامل في حالة وجود اتصال إنترنت بطيء
  const updateProduct = async (e) => { //async :  That means the function can pause while waiting for something (like an API call,file..) without blocking the rest of your app.
        e.preventDefault(); //توقف إعادة تحميل الصفحة عند إرسال النموذج
        
        const formData = new FormData();  // obligatoir (FormData() F majuscule)
        formData.append('_method', 'PATCH')
        formData.append('title', title)
        formData.append('description', description)
        if (image !== null) { //if user upload image send it else ..
            formData.append('image', image)
        }
        

     //when u get the data from user go to this line and send this data(formData)
     await axios.post(`http://127.0.0.1:8000/api/products/${id}`, formData)
                .then(({ data }) => {
                  console.log(data.message)
                  navigate('/') //Redirection 
                });
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Create Form</h3>
              <hr></hr>
              <div className="from-wrapper">

                <form onSubmit={updateProduct}>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control"
                      value={title} onChange={(e) => { setTitle(e.target.value) }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description}
                      onChange={(e) => { setDescription(e.target.value) }}>
                    </textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">image</label>
                    <input type="file" className="form-control"
                      onChange={changeHandler} />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary mb-3">Update</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}