import { useEffect, useState } from "react"
import DecksPage from "./components/decksPage"
import AddCard from "./components/addingCard"
import Cards from './components/cards'
import StudyCards from "./components/study";

export default function App() {
    const [decks, setDecks] = useState(() => {
        const savedDecks = localStorage.getItem('decks');
        return savedDecks ? JSON.parse(savedDecks) : [];
    });
    
    const [cardAdding_DeckID, setCardAdding_DeckID] = useState(null)
    const [cardsList_DeckID, setCardsList_DeckID] = useState(null)
    const [studyDeckID, setStudyDeckID] = useState(null)

    const decksPageStatue = (cardAdding_DeckID || cardsList_DeckID || studyDeckID) ? 'disabled' : null

    return (
        <main className="flex justify-center items-center h-[100vh]">
            
            <DecksPage
                decks={decks}
                setDecks={setDecks}
                handleStudy={setStudyDeckID}
                handleAddCard={setCardAdding_DeckID}
                handleShowCards={setCardsList_DeckID}
                decksPageStatue={decksPageStatue}
            />
            

            {cardAdding_DeckID && 
                <AddCard
                    id={cardAdding_DeckID}
                    decks={decks}
                    setDecks={setDecks}
                    setCardAdding_DeckID={setCardAdding_DeckID}
                />
            }

            {cardsList_DeckID && 
                <Cards
                    id={cardsList_DeckID}
                    decks={decks}
                    setDecks={setDecks}
                    setCardsList_DeckID={setCardsList_DeckID}
                />
            }

            {studyDeckID &&
                <StudyCards 
                    id={studyDeckID}
                    decks={decks}
                    setStudyDeckID={setStudyDeckID}
                />
            }

        </main>
    )
}