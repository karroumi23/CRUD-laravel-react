import React, { useState } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";


export default function CreateProduct(){
    const navigate = useNavigate();
     
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);
     //Locate the file (image) in the array [0,1,2...]
     const changeHandler = (e)=>{ //(e) === event.
        setImage(e.target.files[0])// first file
     }
    
     //للتأكد من تحميل البيانات بالكامل في حالة وجود اتصال إنترنت بطيء
     const CreateProduct = async (e) => {
        e.prevetDefault();
        const formData = new formData();
         formData.append('title',title)
         formData.append('description',description)
         formData.append('image',image)
          //when u get the data from user go to this line and send this data(formData)
          await axios.post('http://127.0.0.1:8000/api/products',formData)
                          .then(({data})=>{
                            console.log(data.message)
                            navigate('/') //Redirection 
                          });
     }


    return(
       <div className="container">
         <div className="row justify-content-center">
           <div className="col-12 col-sm-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Create Form</h3>
                  <hr></hr>
                  <div className="from-wrapper">

                    <form onSubmit={CreateProduct}>
                       
                       <div className="mb-3">
                         <label className="form-label">Title</label>
                         <input type="text" className="form-control" 
                                value={title} onChange={(e)=>{setTitle(e.target.value)}}
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
                          <button type="submit" className="btn btn-primary mb-3">Save</button>
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