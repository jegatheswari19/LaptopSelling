import pic1 from './assets/sony.jpg';
import pic2 from './assets/asus.jpg';


function Product(){

    return(

       <div>
        <h1>Products</h1>
        <div className="column">
                    <img className="ab" src={pic1} alt="SONY" />
                    <h3>SONY</h3>
                    </div>
        <div className="column">
                    <img className="ab" src={pic2} alt="SONY" />
                    <h3>ASUS</h3>
                    </div>

       </div>
    )
}

export default Product;