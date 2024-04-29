import styles from './LogIn.module.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { CustomContext } from '../../CustomContext/CustomContext';
import { loginSelector } from '../../redux/reducers/loginReducer';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword, setIsLoggedIn} from '../../redux/reducers/loginReducer';
import { fetchUsersInfo } from '../../redux/reducers/loginReducer';
import { toast } from 'react-toastify';
export default function LogIn(){

    
    const navigate = useNavigate() // Access the history object
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUsersInfo());
    },[dispatch])

    // const { email, setEmail, password, setPassword, UsersInfo, LogIn} = useContext(CustomContext);
    const {setLoggedIn} = useContext(CustomContext);
    const {email, password, users, userState} = useSelector(loginSelector);
    

    const handleEmailChange = (event) => {
        dispatch(setEmail(event.target.value));
    };

    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Do something with the extracted values ( email, password)
        console.log( email, password);
        console.log(users);

        // Redirect to check and if authentication results in succress then redirect to home page
        let redirect = false;
        // Authenticate the user
        if (userState === 'succeeded'){
            const loggedIn = users.find((info)=> info.Email === email && info.Password === password);
            if (loggedIn){
                setLoggedIn(true);
                dispatch(setIsLoggedIn(true))
                toast.success("Logging In was Success! 😁");
                redirect = true
            }
            
            else{
                toast.error("User not found or wrong password! 😢" ,{
                    position: "top-center"
                  });
            }
        }
        
        if(userState === 'failed'){
            toast.error("Some error occurred while fetching data ! 😵", {
                position: "top-center"
              });
        }
        // const redirect = await LogIn( email, password, users)
        // Redirect to '/product' after form submission
        if(redirect){
            navigate('/Product')
        }
    };

    return(
        <div className={styles.formContainer} onSubmit={handleSubmit}>
            <form className={styles.LoginPageForm}>
            <h2 className={styles.LoginPageHeading}>LogIn</h2>
            <input type="email" name="email" onChange={handleEmailChange} class={styles.LogInInput} placeholder="Enter Email"></input>
            <input type="password" name="password" onChange={handlePasswordChange} class={styles.LogInInput} placeholder="Enter Password"></input>
            
            <button class={styles.submitButton}>Sign In</button>
            
            <Link to={'/SingUp'}>
                <p>Or SignUp instead</p>
            </Link>
            </form>
        </div>
    )
}