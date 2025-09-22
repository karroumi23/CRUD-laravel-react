import React, { useState } from "react";  
import axios from "axios";  // to send Updates 
import { data, useNavigate } from "react-router-dom";


export default function CreateProduct(){
    const navigate = useNavigate(); //Redirection  
     
    const [title,setTitle] = useState('');  //title → the current value of the state 
                                            //setTitle → a function to update that value.
                                            //At the beginning: title = '' .
                                            //If you later call: setTitle('New Product');  ==> title = 'New Product'.
                                            
                                            //to use in form : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);
     //Locate the file (image) in the array [0,1,2...]
     const changeHandler = (e)=>{ //(e) === event.
        setImage(e.target.files[0])// first file
     }
      
     //للتأكد من تحميل البيانات بالكامل في حالة وجود اتصال إنترنت بطيء
     const CreateProduct = async (e) => { //async :  That means the function can pause while waiting for something (like an API call,file..) without blocking the rest of your app.
        e.preventDefault(); //توقف إعادة تحميل الصفحة عند إرسال النموذج
        // Create a new FormData object to send form fields (title, description, image) as multipart/form-data
         const formData = new FormData();

        // Append(إضافة) form fields (title, description, image) to the FormData object
        formData.append('title',title)
        formData.append('description',description)
        formData.append('image',image)
           // Send the FormData to your Laravel API endpoint using Axios
           // The `await` makes JavaScript wait for the response before moving on
           await axios.post('http://127.0.0.1:8000/api/products',formData)
                          .then(({data})=>{
                            console.log(data.message)// Log the success message from backend
                            navigate('/')            //Redirection 
                          })
                          .catch((error) => {
                            console.error(error);    //Handle any errors
                          });
     }


    return(
       <div className="container">
         <div className="row justify-content-center">
           <div className="col-12 col-sm-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Edit Form</h3>
                  <hr></hr>
                  <div className="from-wrapper">

                    <form onSubmit={CreateProduct}>
                       
                       <div className="mb-3">
                         <label className="form-label">Title</label>
                         <input type="text" className="form-control" 
                                value={title} //This means the input’s value always reflects the title state.
                                onChange={(e)=>{setTitle(e.target.value)}} //This updates title every time you type.
                         />
                       </div>
                       <div className="mb-3">
                         <label className="form-label">Description</label>
                         <textarea className="form-control" rows="3" value={description}
                                   onChange={(e)=>{setDescription(e.target.value)}}>
                         </textarea>
                       </div>
                       <div className="mb-3">
                         <label className="form-label">image</label>
                         <input type="file" className="form-control" 
                                onChange={changeHandler}/>
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