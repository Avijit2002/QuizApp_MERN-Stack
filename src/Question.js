export default function Question({ques,dispatch}){
    console.log(ques)
    return(
        <div className="question">
            <h4>{ques.question}</h4>
            <div className="options">
                {ques.options.map(option=> <button key={option} className="btn btn-option">{option}</button>)}
            </div>
            <button className="btn" onClick={()=>dispatch({type:'nextQ'})}>next</button>
        </div>
    )
}