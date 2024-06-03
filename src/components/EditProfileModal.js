import {Modal, Button} from 'react-bootstrap';
import {React, useState} from 'react';
import EditProfile from './EditProfile';


function MyVerticallyCenteredModal({  show, onHide, user, setIsShown, setDisplayMessage, setUpdate, update }) {
  
  return (
    <Modal
      show={ show }
      onHide={ onHide }
      user={ user }
      setIsShown={ setIsShown }
      setDisplayMessage={ setDisplayMessage }
      setUpdate={ setUpdate }
      update={ update }
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change any field to edit your profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <EditProfile user={ user } setIsShown={ setIsShown } setDisplayMessage={ setDisplayMessage } show={ show } onHide={ onHide } setUpdate={ setUpdate } update={ update }/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const  EditProfileModal = ({ user, setIsShown, setDisplayMessage, setUpdate, update }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="info" onClick={() => setModalShow(true)}>
        Edit Profile!
      </Button>

      <MyVerticallyCenteredModal
        show={ modalShow }
        onHide={() => setModalShow(false)}
        user={ user }
        setIsShown={ setIsShown }
        setDisplayMessage={ setDisplayMessage }
        setUpdate={ setUpdate }
        update={ update }
      />
    </>
  );
}
export default EditProfileModal;