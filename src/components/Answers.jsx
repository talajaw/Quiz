//the goal of this component is to output this list of shuffled ansers

import { useRef } from "react";

export default function Answers ({answers , selectedAnswer , answerState , onSelect}) {

    const shuffledAnswers = useRef();  //will not change if the component func is executed again..u can use Ref for managing values that are stored & manage independently from the component func lifecycle to which they belong

    //this 2 lines below only execute if we still have a question to display
    if (!shuffledAnswers.current ) {
    shuffledAnswers.current  = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //Math.random will give us a value between 0 & 1 "1 excluded" with deduct -0.5 we will end up with a negative value in 50 of 100 cases or with positive value


    }//check if  shuffledAnswers is undefiend so if it's not truthy ...cause if undefiend i know that i don't have any shuffled answers yet cause that will be initial state that's is undefined..Butt once it has been defined i will not shuffle them again even if the component func executes again because i already did change the order
  

    return (
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected =selectedAnswer === answer;
            let cssClasses = ''; //which change depending this answer was selected or not and whether it is correct or not if it was selected

            if(answerState === 'answered' && isSelected) { cssClasses = 'selected';}

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {cssClasses = answerState ;}

            return (
                <li key={answer} className="answer">
                <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button> 
            </li>
            );
            
            
        })} 
    </ul>
    );
}