export default function Progress({ques,currentQ,points,totalPoints}){
    return(
        <header className="progress">
            <progress max={ques.length} value={currentQ+1} />
            <p><strong>{currentQ+1}</strong>/{ques.length}</p>
            <p><strong>{points}</strong>/{totalPoints}</p>
        </header>
    )
}