import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
/**
 * The Login function checks the value entered and navigates to the appropriate dashboard or displays
 * an error message.
 * @param value - The value parameter is the input value entered by the user during the login process.
 * It is used to determine whether the user is a teacher or a student.
 */
export const Login=(value)=>{
    const navigate = useNavigate()

try {
    if (value === 'teacher123') {
        navigate('/teacher-home');
      } else if (value === 'student123') {
        navigate('/student-dashboard');
      } else {
        // toast.error('Invalid login. Please enter a valid username.');
      }
} catch (error) {
    toast.error(error.message)
}
}