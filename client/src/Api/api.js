import axios from "axios"
import { GetDate } from './reducers'

export const getDate = () => {
    console.log("GrtDate")
    return async dispatch => {
        try {
            let response = await axios.get('http://localhost:3001/api/get')
            dispatch({ type: GetDate, date: response.data })
        }
        catch (e) {
            console.log("Error: ", e.message)

        }
    }
}

export const deleteDate = (moviewName) => {

    return async dispatch => {
        try {
            await axios.delete(`http://localhost:3001/api/delete/${moviewName}`)

            dispatch(getDate())
        }
        catch (e) {
            console.log("Error: ", e.message)

        }
    }
}



export const appDate = (moviewName, review) => {

    return async dispatch => {
        try {
            await axios.post('http://localhost:3001/api/insert', {
                movieName: moviewName,
                movieReview: review,
                // date: new Date()
            })
            dispatch(getDate())

        }
        catch (e) {
            console.log("Error: ", e.message)

        }
    }
}



export const updateDate = (name, newReview) => {
    return async dispatch => {
        try {
            await axios.put('http://localhost:3001/api/update', {
                movieName: name,
                movieReview: newReview,
            })

            dispatch(getDate())

        }
        catch (e) {
            console.log("Error: ", e.message)

        }
    }
}

