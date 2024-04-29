import logo from './Images/logo.jpeg'
import style from './Logo.module.css'

export default function Logo(){
    return(
        <img src={logo} alt='Official Logo' className={style.imageSize}/>
    )
}