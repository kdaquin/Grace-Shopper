import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";

import { useState, useEffect } from 'react';

import {
    Home,
    Account,
    Products,
    Register,
    Login,
    Cart,
    PopupMessage,
    NavBar,
    CheckoutComplete,
    Dashboard
} from './index';

import { checkUser } from '../api'
import { getToken } from '../auth'

const App = () => {

    const [currentUser, setCurrentUser] = useState();
    const [isShown, setIsShown] = useState(false);
    const [displayMessage, setDisplayMessage] = useState();

    useEffect(() => {
        if (getToken()) {
            checkUser(getToken())
                .then(response => setCurrentUser(response.data))
        }
    }, [])

    return (
        <Router>
            <div className="title"><h1>Boring T-shirt Company</h1></div>
            <NavBar currentUser={currentUser} />

            <Switch>
                <Route exact path={['/home', '/']}>
                    <Home 
                     currentUser={currentUser}
                     setDisplayMessage={setDisplayMessage}
                     setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/cart'>
                    <Cart
                        currentUser={currentUser}
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/login'>
                    <Login
                        setCurrentUser={setCurrentUser}
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/register'>
                    <Register
                        setCurrentUser={setCurrentUser}
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/account'>

                    <Account
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/products'>
                    <Products
                        currentUser={currentUser}
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
                <Route exact path='/completed'>
                    <CheckoutComplete
                        currentUser={currentUser}
                    />
                </Route>
                <Route exact path='/dashboard'>
                    <Dashboard
                        setDisplayMessage={setDisplayMessage}
                        setIsShown={setIsShown}
                    />
                </Route>
            </Switch>
            <div>
                <div className="footerStuff">
                    <div>
                        <h3>Company</h3>
                        <li>About Us</li>
                        <li>Why plain shirts only?</li>
                    </div>
                    <div>
                        <h3>Customer Assistance</h3>
                        <li>Live chat</li>
                        <li>FAQ's</li>
                        <li>Shipping and Handling</li>
                        <li>Return Policy</li>
                        <li>Gift Card</li>
                        <li>Complaint Department</li>
                    </div>
                </div>
                <div className="socials">
                    <div></div>
                    <div>
                        <a href="https://www.facebook.com"><img src="https://i.imgur.com/vKfJRdf.jpg" height="50px" width="50px"/></a>                        
                    </div>
                    <div>
                        <a href="https://www.twitter.com"><img src="https://i.imgur.com/7OF6qbe.png" height="50px" width="50px"/></a>  
                    </div>
                    <div>
                        <a href="https://www.instagram.com"><img src="https://i.imgur.com/im17PfX.png" height="50px" width="50px"/></a>  
                    </div>
                    <div>
                        <a href="https://www.tiktok.com"><img src="https://i.imgur.com/MuFt9jm.png" height="50px" width="50px"/></a>  
                    </div>
                    <div>
                        <a href="https://www.youtube.com"><img src="https://i.imgur.com/oHO7TrR.png" height="50px" width="50px"/></a>  
                    </div>
                    <div></div>
                </div>
            </div>
            
            <div>
                {
                    isShown ? <PopupMessage
                        displayMessage={displayMessage}
                        setIsShown={setIsShown} /> : ''
                }
            </div>
        </Router>
    )
}

export default App;