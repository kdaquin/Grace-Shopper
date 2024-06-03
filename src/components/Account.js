import { useState, useEffect } from 'react';
import EditProfileModal from './EditProfileModal';
import OrderHistoryModal from './OrderHistoryModal';
import { checkUser, getOrders } from '../api';
import { getToken, clearToken } from '../auth';
import { Button } from 'react-bootstrap';
import OrderHistoryCard from './OrderHistoryCard';

const Account = ({ setIsShown, setDisplayMessage }) => {
    const [ currentUser, setCurrentUser ] = useState('');
    const [ update, setUpdate ] = useState("false");
    const [ orders, setOrders ] = useState([]);
    const user = currentUser;

    useEffect (() => {
        async function updateFunction() {
            const { data } = await checkUser(getToken());
            const ordersInCart = await getOrders(getToken());
            setOrders(ordersInCart.data)
            setCurrentUser(data);
            setUpdate("false")
        }
        updateFunction();
    }, [update])

    return (
        
        <div id="acctPage">
            
            <div className="profile">
                <div className="profileInfo">
                    <h2>Welcome { user.username }!</h2>
                    <h3>Current Name on Account: { user.name}</h3>
                    <h3>Current Email: { user.email }</h3>
                    Currently in your <a href="/cart">cart</a>:
                    {   
                       orders.map((order, idx) => {
                           order.id = null
                            return (
                                <OrderHistoryCard order={ order } key={ idx } style={{ width: "70%"}}/>
                            )
                       }) 
                    }
                </div>                
            </div>
            {
                <div className="sideProfile">                                                    
                    <div className="signOut"><Button className="signOutButton" onClick={ clearToken } href="/home">Sign Out</Button></div>
                    <div className="editProfile"><EditProfileModal 
                                                    user={ user } 
                                                    setIsShown={ setIsShown }
                                                    setDisplayMessage={ setDisplayMessage }
                                                    setUpdate={ setUpdate }
                                                    update={ update }
                                                    /></div>
                    <div className="orderHistory"><OrderHistoryModal 
                                                    currentUser={ user } 
                                                    /></div>
                </div>
            }
        </div>
        
    )
}

export default Account;