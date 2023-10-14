import toast from "react-hot-toast"

/**
 * The function `getExams` retrieves exam questions from local storage based on the provided exam
 * title.
 * @param examtitle - The examtitle parameter is a string that represents the title of the exam you
 * want to retrieve.
 * @returns the data from the specified storage if it exists, otherwise it returns null.
 */
export const getExams = async (examtitle)=>{
// the exam tiltle would be used to etch the needed exam
// below still uses a mock data from the local stroage
try {
    const data = JSON.parse(localStorage.getItem('questions'))
if(data){
    return data
}
return null
} catch (error) {
    toast.error(error.message)
}
}