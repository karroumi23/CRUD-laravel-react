import React, { useState, useEffect } from "react"; //useEffect : to upload data one time 
import axios from "axios"; // to send Updates 
import { useNavigate, useParams } from "react-router-dom"; //useNavigate : to redirection
                                                           //useParams : to use id  


export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  //get data 
  useEffect(() => {
    fetchProduct();
  })

  //get the product.
  const fetchProduct = async () => {
   await axios.get('http://127.0.0.1:8000/api/products' + id)
              .then(({ data }) => {
                    const { title, description } = data.product
                    setTitle(title)
                    setDescription(description)
                    navigate('/') //Redirection 
              }).catch(({ response: { data } }) => {
                    console.log(data.message)
              })
  }

  //Locate the file (image) in the array [0,1,2...]
  const changeHandler = (e) => { //(e) === event.
    setImage(e.target.files[0])// first file
  }

  //للتأكد من تحميل البيانات بالكامل في حالة وجود اتصال إنترنت بطيء
  const updateProduct = async (e) => {
        e.prevetDefault();
        const formData = new formData();
        formData.append('_method', 'PATCH')
        formData.append('title', title)
        formData.append('description', description)
        if (image !== null) { //if user upload image send it else ..
            formData.append('image', image)
        }
        

     //when u get the data from user go to this line and send this data(formData)
     await axios.post('http://127.0.0.1:8000/api/products' + id, formData)
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