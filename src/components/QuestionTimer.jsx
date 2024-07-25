import { useState , useEffect } from "react";

export default function QuestionTimer ({timeout , onTimeout , mode}) {
    const [remainingTime , setRemainingTime] = useState(timeout); //timeout is an initial valuse of state because that is the remaining time of this timer when this component is rendered 

    useEffect(() => {
        console.log('SETTING TIMEOUT'); //if i run the code we notic that timeout execute and re-excuted agin but interval only execute once ....so if i look at dependencies timeout is a value din't cause re-executed ...it re-executed if surroundind component func executes again and the dependencies values'timeout' changed.and for a timeout that will definitely not be the case..it is always 10000 Sooo, it must be onTimeout 'this func that changed'onTimeout={() => handelSelectAnswer(null) ..so every time execute the code in quiz file gets reevaluated a new func gets created here(func in javascript are values they are objects and when a func is created like here when jsx code is evalauted it is a new object in memory that being created and even if it contain the same logic and code as before it's still technically a new value in memory) SOOO,,,we have to add a NEW HOOK WHICH ENSURE THAT FUNC DON'T GET RE-CREATED UNLESS THEY NEED CAUSE THEIR DEPENDENCIES CHANGED.(useCallback HOOK)
        const timer =setTimeout(onTimeout , timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout , onTimeout]);//here we need to add a dependencies in an array cause we have 2 dependencies in"setTimeout(onTimeout , timeout);' to make sure this Effect func re-executed if one of those dependencies changes.

    useEffect(() => {
        const interval =setInterval(() => {
            console.log('SETTING INTERVAL');
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100); //minus 100"the frequency i put it here (100 milliseconds) ""
        }, 100); //we need setInterval to update every 100 millisecond this func here should execute
       

        return () => {
            clearInterval(interval); //to cleanup 
        };
    }, []);// i put this code in useEffect to make sure that this is nott re-executed all the time but instead only when those dependencies change

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode}></progress>;
}