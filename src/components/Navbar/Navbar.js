import styles from './Navbar.module.css'
import logo from './Images/logo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// import { useContext } from 'react'
// import { CustomContext } from '../../CustomContext/CustomContext'
import { useSelector } from 'react-redux'
import { loginSelector } from '../../redux/reducers/loginReducer'
export default function Navbar(){

    const {isLoggedIn} = useSelector(loginSelector);
    // const {isLoggedIn} = useContext(CustomContext);
    const navigate = useNavigate()

    return(
        <div className={styles.navbar}>
            <Link to={'/'}>
            <img src={logo} className={styles.logo} alt='Logo'/>
            </Link>
            <ul className={styles.unorderedList}>

                <Link to={'/product'}>
                
                <li>
                    <img src='https://cdn-icons-png.flaticon.com/128/10473/10473299.png' alt='Home'/>
                    Home
                </li>
                </Link>


                {isLoggedIn?<li>
                    <img src='https://cdn-icons-png.flaticon.com/128/5859/5859624.png' alt='Orders' onClick={()=>{navigate('/Orders')}}/>
                    Orders
                </li>:''}
                
                
                {isLoggedIn?<li>
                    <img src='https://cdn-icons-png.flaticon.com/128/4290/4290854.png' alt='cart' onClick={()=>{navigate('/Cart')}}/>
                    Cart
                </li>:''}
                

                {isLoggedIn===false?<Link to={'/Login'}>
                <li>
                    
                    <img src='https://cdn-icons-png.flaticon.com/128/10118/10118894.png' alt='SignIn'/>
                    Sign In
                    
                </li>
                </Link>:''}

                <a href="/">
                {isLoggedIn?
                <li>
                    
                <img src='https://cdn-icons-png.flaticon.com/128/10118/10118894.png' alt='SignOut'/>
                Sign Out
                
                </li>:''}
                </a>
            </ul>
            <Outlet />
        </div>
    )
}