import { useState } from 'react';
import styles from './styles/Modal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from './Api/api';

function Modal({ active, setActive, content, name }) {
    console.log("Content: ", content)
    const dispatch = useDispatch();
    const [newReview, setNewReview] = useState(content)

    const UpDate = () => {
        console.log("newReview: ", newReview)
        dispatch(updateDate(name, newReview))
        setActive({ isOpen: false, content: null, name: null })


    }


    return (
        <div className={active ? styles.active : styles.modal}>
            <div className={styles.modal__content1} >
                <h1 >{name}</h1>
                <textarea rows="20" cols="45" name="text" value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className={styles.updateInput} />

                <div>
                    <button className={styles.buttonClose} onClick={() => setActive({ isOpen: false, content: null, name: null })} >Close </button>
                    <button className={styles.buttonSave} onClick={UpDate} >Save</button>
                </div>

            </div>
        </div>
    )


}

export default Modal;