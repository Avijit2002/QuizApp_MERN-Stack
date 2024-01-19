export default function FinishedScreen({points,totalPoints,dispatch}){
    const percent = (points / totalPoints)*100;
    return(<>
        <p className="result">You Scored <strong>{points}</strong> out of {totalPoints} {Math.ceil(percent)}%</p>
        <button onClick={()=>dispatch({type:'restart'})} className="btn btn-ui">Restart</button>
        </>)
}