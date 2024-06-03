import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../api';
import { storeToken } from '../auth'


const Register = ({ setCurrentUser, setDisplayMessage, setIsShown }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const [username, password, name, email] = event.target;
        if (username.value && password.value && name.value && email.value) {

            setUser({ username: username.value, password: password.value, name: name.value, email: email.value })
        } else {
            setDisplayMessage({
                message: 'Please provide all required feilds',
                type: 'error'
            })
            setIsShown(true);
        }
    }

    let initialRender = useRef(true);
    useEffect(() => {
        if (!initialRender.current) {
            if (user) {
                console.log(user);
                registerUser(user)
                    .then(response => {
                        if (response) {
                            console.log(response.data)
                            setCurrentUser(response.data.user)
                            storeToken(response.data.token);
                            setDisplayMessage({
                                message: 'You are registered!',
                                type: 'success'
                            })
                            setIsShown(true);
                            history.push('/');
                        } else {
                            setDisplayMessage({
                                message: 'Error, username already exists!',
                                type: 'error'
                            })
                            setIsShown(true);
                        }
                    })
            }
        } else {
            initialRender.current = false;
        }
    }, [user])

    return (
        <div className='outerRegisterDiv'>            
            <div className='registerDiv'>
                <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                    <label>Username</label>
                    <input className="inputBoxReg" type='text' required></input>
                    <label>Password</label>
                    <input className="inputBoxReg" type='password'></input>
                    <label>Name</label>
                    <input className="inputBoxReg" type='text' required></input>
                    <label>Email</label>
                    <input className="inputBoxReg" type='email' required></input>
                    <input type='submit'></input>

                </form>
            </div>
        </div>
    )
}

export default Register;