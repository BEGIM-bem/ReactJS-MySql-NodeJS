import React from 'react';
import styles from './styles/Modal.module.css'

function Modal({ active, setActive, content }) {
    console.log("Content: ", content)

    return (
        <div className={active ? styles.active : styles.modal}>
            <div className={styles.modal__content1}   >

                <button onClick={setActive({ isOpen: false, content: null })} >Close </button>
                <button>Save</button>

            </div>
        </div>
    )


}

export default Modal;