import {Modal, Button} from 'react-bootstrap';
import {React, useState, useEffect } from 'react';
import OrderHistoryCard from './OrderHistoryCard';
import { getCompletedOrders } from '../api';
import { getToken } from '../auth';


function MyVerticallyCenteredModal({  show, onHide, currentUser, setIsShown, setDisplayMessage, orders }) {
  
  return (
    <Modal
      show={ show }
      onHide={ onHide }
      currentUser={ currentUser }
      setIsShown={ setIsShown }
      setDisplayMessage={ setDisplayMessage }
      orders={ orders }
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { currentUser.username}'s Order History
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          orders.map((order, idx) => ( <OrderHistoryCard order={ order }/>))
        }      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const  OrderHistoryModal = ({ currentUser }) => {
  const [modalShow, setModalShow] = useState(false);
  const [ orders, setOrders ] = useState([])

  useEffect (() => {
    async function checkOrdersFunction() {
        const { data }  = await getCompletedOrders(getToken());
        setOrders(data)
    }
    checkOrdersFunction();
}, [])

  return (
    <>
      <Button variant="info" onClick={() => setModalShow(true)}>
        Order History
      </Button>

      <MyVerticallyCenteredModal
        show={ modalShow }
        onHide={() => setModalShow(false)}
        currentUser={ currentUser }
        orders={ orders }
      />
    </>
  );
}
export default OrderHistoryModal;