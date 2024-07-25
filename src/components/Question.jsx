import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTION from '../questions.js';

// i create this component to solve the key problem (2 component uses the same key) remove the key from 2 component and now when i create this component i will write this key in Quiz.jsx when i call this component there.

export default function Question ({index , onSelectAnswer , onSkipAnswer}) {

    const [ answer , setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer =10000 ; //i put that let not const cause when the component gests re-renderd because an answer was selected, i wanna change thta value

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000; //until we move to the next question
    }
    //the 1000 & 2000 i put it in up are the same values i have down there for my timers in setTimeout

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer : answer ,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer : answer ,
                isCorrect : QUESTION[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            },2000);
           
        }, 1000); //that the true answer othewise it's wrong answer
    }

    
    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null ){
        answerState = answer.isCorrect ? 'correct' : 'wrong' ;
    }
    else if (answer.selectedAnswer) {
        answerState ='answered';
    }

    return (
        <div id="question">
        <QuestionTimer key={timer}  timeout={timer} onTimeout={ answer.selectedAnswer === '' ? onSkipAnswer : null} mode ={answerState}/> 
        <h2>{QUESTION[index].text}</h2>
        <Answers 
            answers={QUESTION[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={ answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
    );

}

//<QuestionTimer key={timer}...so when we change the timer value we destroy & recreate the question timer component & force the interval to be recreated 
//onTimeout={ answer.selectedAnswer === '' ? onSkipAnswer : null} .... which means noo answer has been selected soo skipp otherwise i don't wanna execute any func