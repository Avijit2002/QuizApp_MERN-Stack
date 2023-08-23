export default function StartingScreen({qnum,dispatch}){
    return(
        <div className="start">
            <h2>Welcome to React Quiz!!!</h2>
            <h3>{qnum} Questions to test your react mastery</h3>
            <button onClick={()=>dispatch({type:'start'})} className="btn btn-ui">Let's Start</button>
        </div>
    )
}