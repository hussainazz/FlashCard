export default function AddCard({id, setDecks, decks, setCardAdding_DeckID}) {
    function submitCard(event) {
        event.preventDefault()
        const formEl = event.currentTarget
        const formData = new FormData(formEl)

        setDecks(prev => prev.map(deck => {
                return deck.id === id ? {
                    ...deck,
                    cards: [
                        ...deck.cards,
                        {id: Math.random(),
                        front: formData.get('front'),
                        back: formData.get('back')}
                    ]
                } : deck
            })
        )
        formEl.reset()
    }

    return (
        <div className="flex flex-col absolute overflow-hidden w-[60%] h-[60%] max-w-110 rounded-2xl items-center bg-linear-to-t from-sky-500 to-indigo-500 shadow-2xl">
            <h1 className="text-3xl mt-7 mb-7 font-semibold text-white drop-shadow-md ">
                {decks.find(deck => deck.id === id).name}:
            </h1>
            <form id="cardAdding-form" className="w-[80%]" onSubmit={submitCard} method="post">
                <label className="text-white text-2xl">
                    Front: <br />
                    <textarea name="front" className="mt-3 mb-6 w-full max-h-15 resize-none p-3 text-black bg-gray-200 focus:bg-white rounded-lg outline-cyan-500"></textarea>
                </label> <br />
                <label className="text-white text-2xl">Back: <br />
                    <textarea name="back" className="mt-3 w-full resize-none h-30 p-3 text-black bg-gray-200 focus:bg-white rounded-lg outline-cyan-500"></textarea>
                </label> <br />
            </form>
            <div className="mt-auto w-full h-12 inline-flex justify-evenly pb-15">
                <button className="w-25 h-9  text-white font-medium bg-indigo-500 rounded-xl hover:bg-indigo-600" 
                    onClick={() => {setCardAdding_DeckID(null)}}>Close</button>
                <button className="w-25 h-9  text-white font-medium bg-indigo-500 rounded-xl hover:bg-indigo-600"
                    type="submit" form="cardAdding-form">Add</button>
            </div>
        </div>
    )
}