import React, { useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { FaTimes } from "react-icons/fa";
import './modal.scss';

const Modal = ({ active, id, children }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(active);
  }, [active])
  return (
    <div id={id} className={`modal ${ isActive ? 'active' : ''}`}>
      {children}
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export const ModalContent = ({ onClose, children }) => {
  const contentRef = useRef(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    onClose && onClose();
  }
  return <div className="modal__content">
    {children}
    <div className="modal__content__close" onClick={closeModal}>
      <FaTimes />
    </div>
  </div>
}

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Modal
