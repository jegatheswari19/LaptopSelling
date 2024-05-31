import pic1 from './assets/sony.jpg';
import pic2 from './assets/asus.jpg';
import { data } from 'autoprefixer';
import { useState } from 'react';


function Product(){
    const[data,setData] = useState();
    useEffect( () =>{
        fetch('http://localhost:8081')
        .then(res=> res.json())
        .then(data =>setData(data))
        .then(err => console.log(err))
      },[])

    return(

       <div>
        <h1>Products</h1>
         <h2>{data}</h2>
       </div>
    )
}
export default Product;