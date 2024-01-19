export default function NextButton ({selectans,dispatch}){
    return(<button disabled={selectans===null} className="btn" onClick={()=>dispatch({type:'nextQ'})}>next</button>)
}