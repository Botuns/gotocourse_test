import App from "../../App";
import ExcelFirstPage from "../../Screens/Teacher/ExcelFirstPage";
import ViewExams from "../../Screens/Teacher/ViewExams";
import CreateQuestionPage from "../../Screens/Teacher/CreateQuestionPage";
import CreateExamPage from "../../Screens/Teacher/CreateExamPage";
import StartExamPage from "../../Screens/Student/StartExamPage";
import AttemptQuestions from "../../Screens/Student/AttemptQuestions";

export const routerToUse =[
    {
      path: "/",
      element:<App/>
    },
    {
      path: "/teacher-home",
      element:<ExcelFirstPage/>
    },
    {
      path: "/create-exams",
      element:<CreateExamPage/>
    },
    {
        path: "/add-questions",
        element:<CreateQuestionPage/>
    },
    {
      path: "/start-exam",
      element:<StartExamPage/>
    },
    {
      path: "/attempt-questions",
      element:<AttemptQuestions/>
    },
    {
        path: "/view-exams",
        element:<ViewExams/>
      },
  
  ];