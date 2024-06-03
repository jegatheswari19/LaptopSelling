import pic1 from './assets/sony.jpg';
import pic2 from './assets/asus.jpg';
import pic3 from './assets/dell.jpg';
import pic4 from './assets/hp.jpg';
import pic5 from './assets/lenovo.jpg';
import pic6 from './assets/acer.jpg';
import pic7 from './assets/samsung.jpg';
import pic8 from './assets/apple.jpg';
import { Link } from 'react-router-dom';
import './Home.css';

const brands = [
    { name: 'SONY', img: pic1 },
    { name: 'ASUS', img: pic2 },
    { name: 'DELL', img: pic3 },
    { name: 'HP', img: pic4 },
    { name: 'LENOVO', img: pic5 },
    { name: 'ACER', img: pic6 },
    { name: 'SAMSUNG', img: pic7 },
    { name: 'APPLE', img: pic8 }
];


function Home() {

 
    return (
        <div>
            <div id="image" className="text">  
                <div className="color">
                    <h1>LAPTOP SHOP</h1>
                </div>
            </div>
            <header className='head'>OUR BRANDS</header> 
            <div className="row"> 
             {brands.map((brand) => (
                    <Link to={`/products/${brand.name.toLowerCase()}`} key={brand.name}>
                        <div className="column">
                            <img className="ab" src={brand.img} alt={brand.name} />
                            <h3>{brand.name}</h3>
                        </div>
                    </Link>
                ))} 
           
            {/* <Link to='/Product'> 
               <div className="column">
                    <img className="ab" src={pic1} alt="SONY" />
                    <h3>SONY</h3>
                    </div>
             </Link> 

               
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic2} alt="ASUS" />
                    <h3>ASUS</h3>  

                </div>
                </Link> 
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic3} alt="DELL" />
                    <h3>DELL</h3>
                </div>
                </Link> 
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic4} alt="HP" />
                    <h3>HP</h3>
                </div>  </Link> 
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic5} alt="LENOVO" />
                    <h3>LENOVO</h3>
                </div>  </Link> 
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic6} alt="ACER" /> 
                    <h3>ACER</h3>
                </div>  </Link> 
               <Link to='/Product'> <div className="column">      
                    <img className="ab" src={pic7} alt="SAMSUNG" />
                    <h3>SAMSUNG</h3>
                </div>   </Link> 
               <Link to='/Product'> <div className="column">
                    <img className="ab" src={pic8} alt="APPLE" />
                    <h3>APPLE</h3>
                </div>  </Link> */}
            </div> 
        </div> 
    );
}

export default Home;
