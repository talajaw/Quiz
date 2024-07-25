import { useState , useCallback , useRef} from "react";
import QUESTION from '../questions.js';

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz () {

    

   // const [answerState , setAnswerState] = useState(''); //to control the answer if correct show green or if false show red
   // const[activeQuestionIndex , setActiveQuestionIndex] = useState(0); //index 0 is a first question...this state is not optimal cause we have two state one of this state here is redundant cause in array state we will store one answer for every question so simply we can look the number of answer in this array that we can derive what the currently active question index should be... so we can delete this state and instead add some derived state.
    const [userAnswers , setUserAnswers] = useState([]); //array to store the answers...this state is an array and we don't wanna lose the old answer so when i update the state in handle func we pass a func to a state cause we wanna update the state based on the previous version of this state

    const activeQuestionIndex =  userAnswers.length ;  //so if that a empty array  this will give us zero for active index questione so that is the first question we wanna show u to the user..So this is a better way to manage the state
//userAnswers.length -1 that we still stick to the old questions
   

    const quizIsComplete = activeQuestionIndex === QUESTION.length; //with this check we make sure that we can't exceed the number of questions we have


    const handelSelectAnswer = useCallback(function handelSelectAnswer (selectedAnswer) {
        //setAnswerState('answered'); //change the state to answered once the user did select an answer
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer , selectedAnswer ] //new array for updating we spread in all those existing user answers and the selectedAnswer as a new element
        });//update the state based on answer"the arrgument passes in func""

        // setTimeout(() => {
        //     if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
        //         setAnswerState('correct');
        //     } else {
        //         setAnswerState('wrong');
        //     }//answers[0] cause in question.js file i put always the first answer is a correct answer

        //     setTimeout(() => {
        //         setAnswerState('');//which in the end make sure that the answer gets reset
        //     }, 2000);//nested timer which will only start after this tmer expired
        // }, 1000); //after 1000 we changed that answer state to correct  or to wrong

    }, []);//to store the selected answer in my user answer array
//here in up line i don't add any dependencies in array cuse in func we are not using any state or props and also not any values that depend on sate or props
//[activeQuestionIndex] in dependencies array now after added a setTimout cause this func here that's wrap by useCallback should be recreated whenever the act of question index value changed because we're using that value in that func body & we don't wanna use an outdated value here so it's important that it gets recreated whenever this answer index changes
    const handleSkipAnswer = useCallback(() => handelSelectAnswer(null) , [handelSelectAnswer]); //i put handleSelectAnswer in dependecies array cause this func depend on props & state


    if(quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }


    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}

                //questionText={QUESTION[activeQuestionIndex].text }
                //answers={QUESTION[activeQuestionIndex].answers}
               // answerSate={answerState}
                //selectedAnswer={userAnswers[userAnswers.length -1]}
                onSelectAnswer={handelSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
           
        </div>
    );
}

//timeout={10000} ===>>> 10sec
//onTimeout={() => handelSelectAnswer(null) ....null that no answer was chosen for this question

//onClick={handelSelectedAnswer} is not enough because like this react would just call this for us and would nott know that it should pass the selectedAnswer along so you must add the arrow func now you can pass the answer like here to the func and not executed immediately when this code here is parsed but instead still only when the button is clicked  onClick={() => handelSelectAnswer(answer)}

// <QuestionTimer key={activeQuestionIndex}> key prop whenever it changs on a component React will destroy the old component instance and create a new one. (for re-start a timer for each question "it had only for the first question run a timer") cause i wanna recreate this question timer component whenever we switch to a new question so put in a key the question index which will change whenever the question changes
// <Answers key={activeQuestionIndex} whenever the key is changes ..use the key prop to force react to destroy & recreate a component
//we must note i use the same key in 2 different component and that is not something u are allowed to do!!!