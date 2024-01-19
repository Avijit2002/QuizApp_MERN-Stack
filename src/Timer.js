import { useEffect } from "react"

export default function Timer({dispatch,timeRemains}){
    useEffect(function(){
        const id = setInterval(function(){
            console.log('tick')
            dispatch({type:'tick'})
        },1000)

        return ()=>clearInterval(id)
    },[dispatch])
    return(
        <div className="timer">{timeRemains}</div>
    )
}