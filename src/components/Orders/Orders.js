import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../CustomContext/CustomContext";
import styles from './Orders.module.css';
import LogInFirst from './Images/NotLoggedIn.jpg';
import { useSelector } from 'react-redux'
import { loginSelector } from '../../redux/reducers/loginReducer'
export default function Orders() {
    const { UserPurchases} = useContext(CustomContext);
    const [userPurchaseInfo, setUserPurchaseInfo] = useState([]);
    const {isLoggedIn, email} = useSelector(loginSelector);
    useEffect(() => {
        const getUserPurchases = async () => {
            try {
                const userPurchases = await UserPurchases(email);
                setUserPurchaseInfo(userPurchases);
            } catch (error) {
                console.error("Error fetching user purchases:", error);
            }
        };
        getUserPurchases();
    }, [UserPurchases, email]);

    // const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // }, []);

    return (
        <>
            {isLoggedIn ? (
                <div className={styles.Heading}>
                    <h3>Your Orders</h3>
                </div>
            ) : (
                <img src={LogInFirst} alt='LogInFirst' className={styles.notLoggedIn}/>
            )}
            {isLoggedIn &&  (
                    <div className={styles.billReceipt}>
                        {userPurchaseInfo.length > 0 ? (
                            userPurchaseInfo.map((purchase) => (
                                <table key={purchase.id} className={styles.orderTable}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchase.Items.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.Name}</td>
                                                <td>{product.Price}</td>
                                                <td>{product.Quantity}</td>
                                                <td>{product.Price * product.Quantity}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>
                                                {purchase.Items.reduce((total, item) => {
                                                    return total + ((+item.Price) * (+item.Quantity));
                                                }, 0)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                        ) : (
                            <p>No orders found</p>
                        )}
                    </div>
                )
            }
        </>
    );
}
