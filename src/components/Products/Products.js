import { useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import styles from './Products.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { productSelector } from "../../redux/reducers/productReducer";
import { loginSelector } from "../../redux/reducers/loginReducer";
import { setUseProductList, setSliderValue, setfiltByMens, setfiltByWomen, setfiltByJewel, setElectronics, updateCartItemQuantity, addNewProductToCart } from "../../redux/reducers/productReducer";
import { fetchProducts } from "../../redux/reducers/productReducer";
import { toast } from "react-toastify";
export default function Products(){

    const dispatch = useDispatch();
    const {productsList, useProductList, sliderValue, filtByMens, filtByWomen, jewel, Electronics, cartItems} = useSelector(productSelector);
    const {isLoggedIn} = useSelector(loginSelector);
    // // Using React Spinner Library
    // const [loading, setLoading] = useState(false);
    // useEffect(()=>{
    //     setLoading(true)
    //     setTimeout(()=>{
    //         setLoading(false)
    //     }, 1000)
    // }, [])

    // // Spinners for Buttons
    // const [buttonActive, setButton] = useState(-1)
    // const ActivateButton = (id)=>{
    //     setButton(id);
    //     setTimeout(()=>{
    //         setButton(-1);
    //     }, 1000)
    //     console.log(id);
    // }

    // to store name of all the albums
    const navigate = useNavigate();
    // const {addToCart} = useContext(CustomContext);    

    // get data from Database when the app gets render
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    const handleMensFilter = (event)=>{
        dispatch(setfiltByMens(event.target.checked));
        if (!filtByMens){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 4){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            dispatch(setUseProductList(filtered.filter(Boolean))); // Filter out undefined values
        }
        else{
            dispatch(setUseProductList(productsList));
        }

    }

    const handleWomensFilter = (event)=>{
        dispatch(setfiltByWomen(event.target.checked));
        if (!filtByWomen){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 3){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            dispatch(setUseProductList(filtered.filter(Boolean))); // Filter out undefined values
        }
        else{
            dispatch(setUseProductList(productsList));
        }
    }

    const handleJewelryFilter = (event)=>{
        dispatch(setfiltByJewel(event.target.checked));
        
        if (!jewel){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 2){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            dispatch(setUseProductList(filtered.filter(Boolean))); // Filter out undefined values
        }
        else{
            dispatch(setUseProductList(productsList));
        }
    }

    const handleElecetronicsFilter = (event)=>{
        dispatch(setElectronics(event.target.checked));
        
        if (!Electronics){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 1){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            dispatch(setUseProductList(filtered.filter(Boolean))); // Filter out undefined values
        }
        else{
            dispatch(setUseProductList(productsList));
        }
    }

    // Refactoring the addToCart
    const addToCart = (Name, Price, Image) => {
        console.log(Name, Price, Image);
        if (!isLoggedIn) {
          return false;
        }
      
        if (cartItems.length !== 0) {
          const isItemPresent = cartItems.find(product => product.Name === Name);
          if (isItemPresent) {
            // Dispatch an action to update the quantity of an existing item in the cart
            dispatch(updateCartItemQuantity({Name, isItemPresent}));
            return true;
          }
        }
      
        // Dispatch an action to add a new product to the cart
        console.log("Action to be dispatched");
        dispatch(addNewProductToCart({Name, Price, Image}));
        return { Name, Price, Quantity: 1, Image };
    };
      
    const handleAddToCart = async (Name, Price, Image, id)=>{
        addToCart(Name, Price, Image);
        if (!isLoggedIn){
            navigate('/Login');
            return;
        }
        // ActivateButton(id)
        toast.success('Product added to your cart!');
    }

    return(
        <>
        
        <aside class={styles.filterSidebar}>
            <h2>Filter</h2>
            <form>
                <label for="price">Price: {sliderValue}</label>
                <input type="range" id="price" name="price" min="1" max="200001" onChange={(e)=>{dispatch(setSliderValue(e.target.value))}} class={styles.priceRange} step="10" defaultValue={sliderValue} />
                <h2>Category</h2>
                <div class={styles.categoryContainer}><div>
                    <input type="checkbox" id="mensFashion" name="mensFashion" onChange={handleMensFilter}/>
                    <label for="mensFashion">Men's Clothing</label></div>
                    <div>
                        <input type="checkbox" id="womensFashion" name="womensFashion" onChange={handleWomensFilter}/>
                        <label for="womensFashion">Women's Clothing</label></div>
                        <div>
                            <input type="checkbox" id="jewelery" name="jewelery" onChange={handleJewelryFilter}/>
                            <label for="jewelery">Jewelery</label></div>
                            <div>
                                <input type="checkbox" id="electronics" name="electronics" onChange={handleElecetronicsFilter}/>
                                <label for="electronics">Electronics</label></div>
                            </div>
            </form>
        </aside>
        <div className={styles.grid}>
        {useProductList && useProductList.map((d, index) => {
        if (d && sliderValue >= d.Price) {
            
            return (
                <div key={index} className={styles.ProductCard}>
                    <img src={d.Image} alt={index} className={styles.imgSize}/>
                    <div className={styles.productDescription}>
                        <div className={styles.productName}>
                            <p>{d.Name}</p>
                        </div>
                        <div className={styles.ProductPrice}>₹{d.Price.toLocaleString('en-IN')}</div>
                        <button className={styles.addButton} title="Add to Cart" onClick={()=>{handleAddToCart(d.Name, d.Price, d.Image, index)}}>'Add To Cart'</button>
                    </div>
                </div>
            );
        } else {
            return null; // If sliderValue is less than d.Price, don't render anything
        }
        })}
        </div>
        </>
    )
}