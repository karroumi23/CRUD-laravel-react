import React, { useState, useEffect } from "react"; //useEffect : to upload data one time 
import axios from "axios"; // to send Updates 
import { Link } from "react-router-dom";  


export default function ProductList() {


  const [products, setProducts] = useState([]);  //([]) : empty array because it get a lot of things (products)


  //get data 
  useEffect(() => {
    fetchProducts();
  }, [])

  //get the product. //arow fun
   const fetchProducts = async () => {
      await axios.get('http://127.0.0.1:8000/api/products' )
                 .then(({ data }) => {setProducts(data)});
   }

  //Delete Product 
  const deleteProduct = async (id) => { // if u call this function u have to give it (id) (example : Delete button)
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
               .then(({ data }) => {
                    console.log(data.message)
                    fetchProducts(); // refresh list
               }).catch(({ response: { data } }) => {
                     console.log(data.message)
               })
   }







  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 ">
          <Link className="btn btn-primary mb-2 float-end" to="/product/create">
                 Create
          </Link>
          <div className="col-12">
              

          <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                 {
                   products.length > 0 && ( // only render if products exist
                    products.map((row,key)=>( // loop through products
                      <tr key={key}>
                        <th>{row.title}</th> {/* product.title */}
                        <td>{row.description}</td>
                        <td>
                            <img width="80px" src={`http://127.0.0.1:8000/storage/product/image/${row.image}`}/>
                        </td>
                        <td>
                        <Link className="btn btn-primary mb-2 float-end" to={`/product/edit/${row.id}`}>Edit</Link>
                        </td>
                        <td>
                           <button  className="btn btn-danger" onClick={()=>{deleteProduct(row.id)}}>Delete</button>
                        </td>
                      </tr>

                    ))

                   )
                 }
               
                
              </tbody>
          </table>                 
 

          </div>
        </div>
      </div>
    </div>
  )
}