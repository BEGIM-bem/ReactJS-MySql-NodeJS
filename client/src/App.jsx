import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { appDate, deleteDate, getDate, updateDate } from './Api/api';
import DeleteIcon from '@mui/icons-material/Delete';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Modal from './Modal';
import Logo from './icon/logo.png'





function App() {
  const [moviewName, setMoviewName] = useState('')
  const [review, setReview] = useState('')
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const [isEdit, setIsEditMoal] = useState({ isOpen: false, content: null, name: null })

  const [newReview, setNewReview] = useState('')
  const dispatch = useDispatch();

  const allDate = useSelector(state => state.memory)

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };



  useEffect(() => {
    dispatch(getDate())
  }, [])


  const sumbitResult = (e) => {
    e.preventDefault();
    dispatch(appDate(moviewName, review))
  }

  const deleteReview = (moviewName) => {
    dispatch(deleteDate(moviewName))
  }

  const updateReview = (movie) => {
    dispatch(updateDate(movie, newReview))
  }

  return (
    <div className={styles.App}>

      <div className={styles.headers} >
        <img src={Logo} alt='not ding icon' className={styles.logo} />
        <h1 className={styles.headers__title} >Memories </h1>
      </div>


      <div className={styles.form}>

        <form className={styles.AddForm} >
          <p className={styles.title}>Creating a Memory</p>

          {/* <input type="file" onChange={saveFile} /> */}
          {/* <button onClick={uploadFile}>Upload</button> */}

          <label>Movie Name: </label>
          <input type='text' name='movieName' className={styles.input}
            onChange={(e) => { setMoviewName(e.target.value) }} />

          <label>Review:  </label>
          <input type='text' name='review' className={styles.input1}
            onChange={(e) => { setReview(e.target.value) }} />

          <button className={styles.sumbit} onClick={sumbitResult}>Sumbit</button>
          <button className={styles.sumbit_clear} >Clear</button>
        </form>
        <div className={styles.d} >

          {
            allDate.date.map(item => {
              return (
                // <div className={styles.all_cards} >

                <div className={styles.card}>
                  <h1 className={styles.movieName} >{item.movieName} </h1>
                  <p >  {item.movieReview}</p>

                  <div className={styles.operations}>
                    <button type='sumbit' className={styles.buttonSumbit} onClick={() => deleteReview(item.movieName)} ><DeleteIcon /> </button>
                    {/* <input type='text' onChange={(e) => setNewReview(e.target.value)} className={styles.updateInput} /> */}
                    <button type='sumbit' className={styles.buttonSumbit} onClick={() => setIsEditMoal({ isOpen: true, content: item.movieReview, name: item.movieName })}> <EditRoadIcon /> </button>
                  </div>
                </div>

              )
            })

          }
        </div>

        {
          isEdit.content !== null ?
            <Modal
              active={isEdit.isOpen} content={isEdit.content} name={isEdit.name} setActive={setIsEditMoal} /> : null
        }
      </div>


    </div>
  );
}

export default App;
