import React,{useState} from 'react';
import './App.css';
import {fetchQuestions,Difficulty} from './Api';
import { GlobalStyle, Wrapper } from './App.styles';
import {QuestionState} from './Api';
import QuestionCard from './components/QuestionCard';
const TOTAL_QUESTION=10;
export type AnswerObject={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;

}
function App() {
  const [isLoading, setisLoading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [useranswer, setuseranswer] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const startQuiz=async()=>{
    setisLoading(true);
    setgameOver(false);
    const questions=await fetchQuestions(TOTAL_QUESTION,Difficulty.MEDIUM);
    console.log(questions);
    setquestions(questions);
    setnumber(0);
    setuseranswer([]);
    setscore(0);
    setisLoading(false);
   
  }
  
  const checkAnswer=(e:any)=>{
    if(!gameOver){
      const userAnswer=e.target.value;
      const correct=questions[number].correct_answer===userAnswer;
      if(correct) setscore(prev=>prev+1);
      const answerObject={
        question:questions[number].question,
        answer:userAnswer,
        correct,
        correctAnswer:questions[number].correct_answer
      }
      setuseranswer((prev)=>[...prev,answerObject]);
    }

  }
  const nextQuestion=()=>{
      const nextQuestion=number+1;
      if(nextQuestion===TOTAL_QUESTION)
      {
        setgameOver(true);
      }
      else{
        setnumber(nextQuestion);
      }
  }
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver|| useranswer.length===TOTAL_QUESTION?(<button onClick={startQuiz} className='start'>start</button>):null}
      {!gameOver?<p className='score'>Score:{score}</p>:null}
      {isLoading?<p>Loading...</p>:null}
      {!isLoading && !gameOver &&(
        <QuestionCard
        questionNr={number+1}
        totalQuestions={TOTAL_QUESTION}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={useranswer?useranswer[number]:undefined}
        checkAnswer={checkAnswer}
        />

      )}
        {!gameOver && !isLoading && useranswer.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </Wrapper>
    </>
  );
 
}

export default App;
