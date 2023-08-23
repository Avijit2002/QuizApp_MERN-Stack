//import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartingScreen from "./StartingScreen"
import Question from "./Question";

const initialState = {
    questions:{},
    status : 'loading', // loading,ready,finished,error etc...
    currentQ : null
}
function reducer(state,action){
    switch(action.type){
        case 'dataLoaded': return {
            ...state,
            questions: action.payload,
            status: 'ready'
        };
        case 'start': return {
            ...state,
            status:'active',
            currentQ : 0
        };
        case 'nextQ' : return({
            ...state,
            currentQ: state.currentQ++
        })
        case 'error':return {
            ...state,
            status: 'error'
        }
        default : throw new Error("unknown Action")
    }
}

export default function App(){
    const [state,dispatch] = useReducer(reducer,initialState)
    const {questions,status,currentQ} = state;
    useEffect(()=>{
        async function getData(){
            try {
                const res = await fetch("http://localhost:1234/questions")
                const questions = await res.json()
                dispatch({
                    type: 'dataLoaded',
                    payload : questions
                })
            } catch (error) {
                dispatch({
                    type: 'error'
                })
            }
            
            //console.log(typeof(res))
            
            //const questions = await res.json();
            //console.log(questions);
            
        }
        getData();
    },[])
    return(
        <div className="app">
            <Header />
            <Main>
                {status==='loading' && <Loader />}
                {status==='error' && <Error />}
                {status==='ready' && 
                <StartingScreen 
                    qnum = {questions.length}
                    dispatch={dispatch} />}
                {status==='active' && 
                <Question 
                    ques={questions[currentQ]}
                    dispatch={dispatch}/>}
            </Main>  
        </div>
    )
};