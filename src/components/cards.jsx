import { useState } from "react"

export default function Cards({id, decks, setDecks, setCardsList_DeckID}) {
    
    const remove = (cardId) => {
        return setDecks(prev => prev.map(deck => deck.id === id
            ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
            : deck
        ))
    }

    const handleEdit = (event, cardId) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setDecks(prev => prev.map(deck => deck.id === id ? {
            ...deck,
            cards: deck.cards.map(card => card.id === cardId ? {
                ...card,
                front: formData.get('front'),
                back: formData.get('back')
            }: card)
        } : deck))
        setEditingCard(null)
    }

    const [editingCard, setEditingCard] = useState(null)
    const edit = (cardId) => {
        setEditingCard(decks.find(deck => deck.id === id)?.cards.find(card => card.id === cardId))
    }

    if(decks.find(deck => deck.id === id).cards.length === 0) setCardsList_DeckID(null)

    return ( decks.find(deck => deck.id === id).cards.length > 0 &&
        <>
        <section className="absolute flex flex-col w-[60%] h-[80%] overflow-hidden max-w-110 bg-white rounded-2xl p-4 drop-shadow-2xl"
            style={{backgroundColor: editingCard ? '#D8D8D8' : '', pointerEvents: editingCard ? 'none' : 'auto'}}>
            <div className="inline-flex justify-center items-center mb-7">
                <h2 className="ml-auto text-3xl font-bold">
                    {decks.find(deck => deck.id === id).name}'s Cards:</h2>
                <button className="ml-auto bg-gray-200 w-9 h-9 rounded-4xl text-xl hover:bg-gray-400"
                    onClick={() => setCardsList_DeckID(null)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            {decks
            .find(deck => deck.id === id)
            ?.cards.map(card =>
                <div key={card.id} className="inline-flex border-[0.5px] rounded-md mb-5 p-4 items-center gap-5 shadow-md">
                    <div className="w-47 flex flex-col h-full justify-between">
                        <p className="h-[50%] border-b-[0.5px] truncate">{card.front}</p>
                        <p className="h-[50%] mt-1 truncate">{card.back}</p>
                    </div>
                    <div className="flex flex-col ml-auto gap-2 text-sm">
                        <button className="bg-gray-200 rounded-md p-1 hover:bg-black hover:text-white"
                            onClick={() => edit(card.id)}>Edit</button>
                        <button className="bg-gray-200 rounded-md p-1 hover:bg-black hover:text-white"
                            onClick={() => remove(card.id)}>Remove</button>
                    </div>
                </div>
            )}
        </section>
        {editingCard !== null &&
            <div className="bg-white drop-shadow-xl absolute self-center justify-self-center w-110 h-70 rounded-2xl p-3">
                <div className="mb-2 w-full flex justify-center">
                    <button className="text-red-900 hover:bg-red-700 hover:text-white w-6 rounded-4xl"
                        onClick={() => setEditingCard(null)}><i class="fa-solid fa-xmark"></i></button>
                </div>
                <form className="flex flex-col gap-2 items-center"
                    onSubmit={(event) => handleEdit(event, editingCard.id)}>
                    <div className="bg-amber-100 pt-5 pb-5 pl-3 rounded-xl w-100">
                        <label className="text-gray-700 font-semibold"> Front:
                            <input className="text-black ml-2 bg-white h-10 w-80 pl-2 focus:outline-1"
                                type="text" name="front" defaultValue={editingCard.front}/>
                        </label>
                    </div>
                    <div className="bg-amber-100 pt-5 pb-5 pl-3 rounded-xl w-100">
                        <label className=" text-gray-700 font-semibold"> Back:
                            <input className="text-black ml-2 bg-white h-10 w-80 pl-2 focus:outline-1"
                                type="text" name="back" defaultValue={editingCard.back}/>
                        </label>
                    </div>
                    <button className="bg-amber-500 rounded-xl mt-2 pt-2 pb-2 pl-4 pr-4 text-white font-medium hover:bg-green-500"
                        type="submit">Save</button>
                </form>
            </div>
        }     
        </>
    )
}