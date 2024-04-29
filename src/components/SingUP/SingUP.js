import styles from './SingUP.module.css'
import { useContext } from 'react'
import { CustomContext } from '../../CustomContext/CustomContext'
import { useSelector, useDispatch } from 'react-redux';
import { loginSelector } from '../../redux/reducers/loginReducer';
import { setName, setEmail, setPassword } from '../../redux/reducers/loginReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function SingUP(){
    const navigate = useNavigate() 
    const dispatch = useDispatch();
    const {registerNewUser} = useContext(CustomContext);
    const {name, email, password} = useSelector(loginSelector);
    const handleNameChange = (event) => {
        dispatch(setName(event.target.value));
    };

    const handleEmailChange = (event) => {
        dispatch(setEmail(event.target.value.trim()));
    };

    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if name and password are not empty
        if (name.trim() === '' || password.trim() === '') {
            toast.error('Name and Password are required! 😵', {
                position: "top-center"
            });
            return; // Exit early if validation fails
        }

        // Do something with the extracted values (name, email, password)
        console.log(name, email, password);
        registerNewUser(name, email, password)
        .then((result)=>{
            toast.success('User Registered Successfully! 🤩 ')
            navigate('/Login');
        })
        .catch((error)=>{
            toast.error('User could be registered! 😵', {
                position: "top-center"
              })
        })
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.SingUpform} onSubmit={handleSubmit}>
                <h2 className={styles.FormHeading}>Sign Up</h2>
                <input type="text" name="name" value={name} onChange={handleNameChange} className={styles.formInput} placeholder="Enter Name" />
                <input type="email" name="email" value={email} onChange={handleEmailChange} className={styles.formInput} placeholder="Enter Email" />
                <input type="password" name="password" value={password} onChange={handlePasswordChange} className={styles.formInput} placeholder="Enter Password" />
                <button type="submit" className={styles.formSubmitButton}>Sign Up</button>
            </form>
        </div>
    );
}