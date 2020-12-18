import {shuffleArray} from './utilis'
export type Question={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string,
    type:string;
}
export enum Difficulty{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}
export type QuestionState=Question & {answers:string[]};
export const fetchQuestions=async(amount:number,difficulty:Difficulty):Promise<QuestionState[]>=>{
    console.log(amount,difficulty);
    const url=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(url)).json();
    // console.log(data);
    return data.results.map((question:Question)=>({
        ...question,
        answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
    }));

}