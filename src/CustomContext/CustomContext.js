import { createContext, useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CustomContext = createContext();

export default function CustomProviderContext({children}){

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);


    const UserPurchases = async (targetEmail)=>{
        const querySnapShot = await getDocs(collection(db, 'UsersPurchases'));
        const UsersPurchases = querySnapShot.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        .filter((user) => user.Email === targetEmail); // Filter based on target email
    
        return UsersPurchases;
    }

    const UsersInfo = async () => {
        const querySnapShot = await getDocs(collection(db, 'UsersInfo'));
        const users = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return users;
    };
    

    const LogIn = async (email, password, users)=>{
        console.log('users received was: ', users);
        const loggedIn = users.find((info)=> info.Email === email && info.Password === password);
        if (loggedIn){
            setLoggedIn(true);
            toast.success("Logging In was Success!");
            return true
        }

        
        return false
    }
    

    const registerNewUser = async (Name, Email, Password)=>{
        const data = {
            Name:Name,
            Email:Email,
            Password:Password
        }

        // Add a new document in collection "UsersInfo"
        // Add a new document with a generated id.
        const res = await addDoc(collection(db, "UsersInfo"), data);
        console.log(res);
        // notification for new album
        toast.success("New user added!.");
        
    };

    const addToCart = async (Name, Price, Image)=>{
        if (!isLoggedIn){
            return false;
        }
        
        if(cartItems.length !== 0){
            const isItemPresent = cartItems.find(produts=>produts.Name === Name);
            if (isItemPresent){
                isItemPresent.Quantity += 1;
                console.log(cartItems);
                return true
                
            }
            
        }

        
        const newProduct = {Name: Name, Price: Price, Quantity: 1, Image: Image};
        setCartItems(prevProducts=>[...prevProducts, newProduct])
        return newProduct;
    }

    const updateCartTotalPrice = (newTotal)=>{
        setTotalCartPrice(newTotal);
    }

    const savePurchaseDetails = async (email, Items)=>{
        const data = {
            Email:email,
            Items:Items
        }

        const res = await addDoc(collection(db, "UsersPurchases"), data);
        console.log(res);
        // notification for new album
        toast.success("Items Purchased!.");
        
    }

    return(
        <CustomContext.Provider value={{registerNewUser, name, setName, email, setEmail, password, setPassword, isLoggedIn, setLoggedIn, UsersInfo, LogIn, addToCart, cartItems, setCartItems, totalCartPrice, updateCartTotalPrice, savePurchaseDetails, UserPurchases}}>
            {children}
        </CustomContext.Provider>
    )
}

export {CustomContext};
