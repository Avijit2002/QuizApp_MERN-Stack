export default function Options({options,ans,selectans,dispatch}){
    return(
<div className="options">
    {options.map((option,index)=> <button 
    onClick={()=>dispatch({
        type:'setans',
        payload:index
    })} 
    disabled={selectans!==null}
    key={option} 
    className={`btn btn-option ${selectans!==null && (index===ans?`correct`:(selectans===index?`red`:`wrong`))}`}>{option}</button>)}
</div>)
}