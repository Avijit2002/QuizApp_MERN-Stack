//import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartingScreen from "./StartingScreen"
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const QUES_PER_SEC = 1;
const initialState = {
    questions:[],
    status : 'loading', // loading,ready,finished,error etc...
    currentQ : null,
    selectans : null,
    points :0,
    timeRemains:null
}
function reducer(state,action){
    switch(action.type){
        case 'dataLoaded': return {
            ...state,
            questions: action.payload,
            status: 'ready',
            timeRemains: action.payload.length * QUES_PER_SEC
        };
        case 'start': return {
            ...state,
            status:'active',
            currentQ : 0
        };
        case 'nextQ' :
            const isFinished = state.currentQ!==state.questions.length
            return({
            ...state,
            currentQ: 
                isFinished? state.currentQ++:state.currentQ,
            selectans:null,
            status: isFinished? state.status: 'finished'
        })
        case 'error':return {
            ...state,
            status: 'error'
        };
        case 'setans': 
            const ques = state.questions.at(state.currentQ);
            const iscorrect = 
                action.payload === ques.correctOption
            return {
            ...state,
            selectans: action.payload,
            points: iscorrect? state.points+ques.points:state.points
        }
        case 'restart':
            return({...initialState, questions:state.questions,status:'ready',timeRemains: state.questions.length * QUES_PER_SEC});
        case 'tick':
            return {...state,
                timeRemains:state.timeRemains-1,
                status: state.timeRemains===0?'finished':state.status }
        default : throw new Error("unknown Action")
    }
}

export default function App(){
    const [state,dispatch] = useReducer(reducer,initialState)
    const {questions,status,currentQ,selectans,points,timeRemains} = state;

    const totalPoints = questions.reduce((prev,curr)=>prev+curr.points,0);
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
                <>
                <Progress 
                    ques={questions}
                    currentQ={currentQ}
                    points={points}
                    totalPoints={totalPoints}/>
                <Question 
                    ques={questions[currentQ]}
                    dispatch={dispatch}
                    selectans={selectans}/>
                <Footer>
                    <Timer dispatch={dispatch} timeRemains={timeRemains}/>
                    <NextButton dispatch={dispatch}
                    selectans={selectans}/>
                </Footer>
                </>}
                {status==='finished' && 
                <FinishedScreen 
                    points={points}
                    totalPoints={totalPoints}
                    dispatch={dispatch}/>}
            </Main>  
        </div>
    )
};