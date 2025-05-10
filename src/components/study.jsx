import { useEffect, useState } from "react"

export default function StudyCards({id, decks, setStudyDeckID}) {
    const [queue, setQueue] = useState(decks.find(deck => deck.id === id)?.cards || [])

    const [studyingCard, setStudyingCard] = useState(queue[0] || null)

    if(queue.length === 0) setStudyDeckID(null)

    useEffect(() => {
        setStudyingCard(queue[0])
    },[queue])

    const known = (cardId) => {
        setQueue(prev => prev.filter(card => card.id !== cardId))
    }

    const unknown = (cardId) => {
        let filteredQueue = queue.filter(card => card.id !== cardId)
        filteredQueue.push(studyingCard)
        return setQueue(filteredQueue)
    }

    const [showBack, setShowBack] = useState(false)

    return (queue.length > 0 && 
        <section className="absolute w-130 h-90 rounded-3xl p-3 shadow-2xl bg-white flex flex-col items-center">
            <button className="mb-2 w-7 h-7 rounded-full hover:bg-rose-600 hover:text-white"
                onClick={() => setStudyDeckID(null)}><i class="fa-solid fa-xmark"></i></button>
            {studyingCard !== null && (
                <>
                    <div className="bg-linear-to-bl from-violet-500 to-fuchsia-500 w-115 h-60 rounded-2xl flex justify-center items-center shadow-md"
                        onClick={() => {setShowBack(!showBack)}}>
                        <p className="text-white text-4xl font-extrabold"> 
                            {showBack ? studyingCard.front : studyingCard.back}</p>
                    </div>
                    <div className="inline-flex gap-15 mt-3 drop-shadow-md">
                        <button className="text-4xl h-14 w-14 rounded-full bg-rose-600 text-white hover:bg-rose-700"
                            onClick={() => unknown(studyingCard.id)}><i class="fa-solid fa-xmark"></i></button>
                            <button className="bg-black font-medium pl-2 pr-2 rounded-xl text-white hover:bg-gray-500"
                            onClick={() => setShowBack(!showBack)}>Show Back</button>
                        <button className="text-4xl rounded-full h-14 w-14 bg-green-400 text-white hover:bg-green-600"
                            onClick={() => known(studyingCard.id)}><i class="fa-solid fa-check"></i></button>
                    </div>
                </>
                )
            }
        </section>
    )
}