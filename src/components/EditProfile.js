import {React, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { editProfile } from '../api';
import { getToken } from '../auth';


const EditProfile = ({ user, setIsShown, setDisplayMessage, onHide, setUpdate, update }) => {
    const [ username, setUsername ] = useState(undefined);
    const [ email, setEmail ] = useState(undefined);
    const [ password, setPassword ] = useState(undefined);
    const [ name, setName ] = useState(undefined);
    
    return (
    
        <div>              
             <Form style={{ backgroundColor: "rgb(240, 234, 234)", borderRadius: "10px", padding: "10px", border: "solid #2980b9 5px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Form.Group controlId="UsernameArea" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                         as="textarea"
                         rows={ 1 } 
                        placeholder={ user.username } 
                        value={ username } 
                        onChange={(event) => setUsername(event.target.value)}> 
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="EmailArea">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                     as="textarea"
                     rows={ 1 }
                     placeholder={ user.email } 
                     value={ email } 
                     onChange={(event) => setEmail(event.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId="PasswordArea">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     as="textarea"
                     rows={ 1 }
                     placeholder="Password" 
                     value={ password } 
                     onChange={(event) => setPassword(event.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId="NameArea">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                     as="textarea"
                     rows={ 1 }
                     placeholder={ user.name } 
                     value={ name } 
                     onChange={(event) => setName(event.target.value)}>
                     </Form.Control>
                </Form.Group>
                
                <Button variant="success" onClick={() => { 
                                                        onHide();
                                                        setUpdate("true");
                                                        editProfile({ id: user.id, username: user.username }, { username: username, email: email, password: password, name: name }, getToken());
                                                        setDisplayMessage({
                                                        message: 'You have edited your profile!',
                                                        type: 'success'
                                                        });
                                                        setIsShown(true);
                                                        }}>Submit</Button>{''}
                </Form>
        </div>
    )
}
export default EditProfile;