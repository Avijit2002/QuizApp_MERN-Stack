import Options from "./Options"

export default function Question({ques,dispatch,selectans}){
    console.log(ques)
    return(
        <div className="question">
            <h4>{ques.question}</h4>
            <Options options={ques.options} ans={ques.correctOption} selectans={selectans} dispatch={dispatch}/>
        </div>
    )
}