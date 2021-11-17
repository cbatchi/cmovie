import React, { useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { FaTimes } from "react-icons/fa";
import './modal.scss';

const Modal = props => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(props.active);
  }, [props.active])
  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  )
}


Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

export const ModalContent = props => {
  const contentRef = useRef(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    props.onClose && props.onClose();
  }
  return <div className="modal__content">
    {props.children}
    <div className="modal__content__close" onClick={closeModal}>
      <FaTimes />
    </div>
  </div>
}

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default Modal
