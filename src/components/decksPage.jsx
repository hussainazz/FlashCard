import React,{ useState,useRef, useEffect } from 'react'
import {nanoid} from 'nanoid'
import { delay, motion } from 'framer-motion'

function Deck( {index, decks, id, value, handleSubmit, handleDelete, handleAddCard, handleShowCards, handleStudy} ) {
    const [isSumbmitted, setIsSubmitted] = useState(false)
    let inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [inputRef, isSumbmitted])

    const handleInput = (event) => {
        if(event.type === 'keydown' && event.key !== 'Enter') return
        
        handleSubmit(id, inputRef.current.value)
        setIsSubmitted(true)
    }

    const cards = decks.find(deck => deck.id === id).cards

    const [isEmpty, setIsEmpty] = useState(null)

    useEffect(() => {
        setIsEmpty(cards.length > 0 ? false : true)
    },[cards])

    const colors = [
        'linear-gradient(43deg, #8BC6EC 40%, #9599E2 100%)',
        'linear-gradient(43deg, #6DD7C3 40%, #9FACE6 100%)',
        'linear-gradient(43deg, #8EC5FC 40%, #E0C3FC 100%)',
        'linear-gradient(43deg, #D9AFD9 40%, #97D9E1 100%)',
        'linear-gradient(43deg, #A9C9FF 40%, #FFBBEC 100%)'
    ]
    const color = colors[index % colors.length]
    const style = {
        background: `${color}`
    }

    const [hoveredBtn, setHoveredBtn] = useState(null)
    const buttonVariants = {
        default: { width:'20px', backgroundColor:'transparent', color:'inherit' },
        hovered: { width:'100px', backgroundColor:'black', color:'white' }
    }

    return(
        <div className='w-55 h-35 rounded-xl flex flex-col justify-center items-center drop-shadow-xl pl-1 pr-1'
            style={style}>
                    <div>
                        {isSumbmitted
                            ? <h3 className="text-white text-3xl font-medium drop-shadow-md mb-6
                                    max-w-52 whitespace-nowrap overflow-x-hidden
                                    hover:overflow-x-auto focus:overflow-x-auto"
                                    style={{scrollbarWidth: 'none'}}>
                                  {value}</h3>
                            : <input
                                className= 'text-gray-50 text-3xl max-w-50 text-center mb-6 outline-1 outline-blue-500 rounded-md pt-2 pb-2'
                                placeholder='Deck Name'
                                type='text'
                                ref={inputRef}
                                onKeyDown={handleInput}
                                onBlur={handleInput}
                                defaultValue={value}
                            />
                        }
                    </div>
                    <div className='whitespace-nowrap overflow-hidden max-w-full inline-flex gap-2'>
                        {[
                            { name:'Rename', icon: "fa-file-pen", action: () => setIsSubmitted(false) },
                            { name:'Delete', icon: "fa-trash", action: () => handleDelete(id) },
                            { name:'Add Card', icon: "fa-plus", action: () => handleAddCard(id) },
                            { name:'Cards', icon: "fa-list-ul", action: () => handleShowCards(id), isEmpty: isEmpty},
                            { name:'Study', icon: "fa-book-open", action: () => handleStudy(id), isEmpty: isEmpty },
                        ].map((btn, index) => (
                            <motion.button
                                key={index}
                                onClick={btn.action}
                                className={`text-lg rounded-lg inline-flex justify-evenly pt-1 pb-1`}
                                onMouseEnter={() => setHoveredBtn(index)}
                                onMouseLeave={() => setHoveredBtn(null)}
                                initial='default'
                                animate={hoveredBtn === index ? 'hovered' : 'default'}
                                variants={buttonVariants}
                                style={{opacity: btn.isEmpty ? 0.5 : 1, pointerEvents: btn.isEmpty ? 'none' : 'auto'}}
                            >
                                <i className={`fa-solid ${btn.icon}`}></i>
                                {hoveredBtn === index && (
                                    <motion.span
                                        className='text-sm'
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 5 }}
                                    >
                                        {btn.name}
                                    </motion.span>
                                )}
                            </motion.button>
                        ))}
                    </div>
        </div>
    )
}

export default function DecksPage({decks, setDecks, handleAddCard, handleShowCards, handleStudy, decksPageStatue}) {  
   const addDeck = () => {
        setDecks(deck => [
            ...deck, 
            {
                id: nanoid(),
                name: '',
                cards: []
            }
        ])
    }
    const handleSubmit = (id, value) => {
        if(value.trim()){
            setDecks(prev => prev.map(deck =>
                deck.id === id ?
                {...deck, name: value} :
                deck
            ))
        } else deleteDeck(id)
    }
    const deleteDeck = (id) => {
        setDecks(prev => prev.filter(deck => deck.id !== id))
    }
    let decksElement = decks.map((deck, index) => <Deck handleStudy={handleStudy} handleShowCards={handleShowCards} handleAddCard={handleAddCard} key={deck.id} index={index} id={deck.id} handleSubmit={handleSubmit} value={deck.name} handleDelete={deleteDeck} decks={decks}/>)

    localStorage.setItem('decks', JSON.stringify(decks))
    return(
        decks.length > 0
        ? <section className='flex flex-col max-w-200 p-5 justify-self-center rounded-2xl bg-linear-to-r from-cyan-500 to-blue-400'
            style={{opacity: decksPageStatue ? 0.5 : 1, pointerEvents: decksPageStatue ? 'none' : 'auto'}}
          >
            <h1 className='self-center mt-7 mb-12 text-2xl text-white font-semibold drop-shadow-sm'>
                Your Decks:</h1>
            <section className='flex self-start justify-self-center gap-7 flex-wrap justify-center pb-5'>
                {decksElement}
                <button onClick={addDeck} className='w-55 h-35 rounded-xl bg-transparent border-1 border-gray-300 text-4xl text-gray-500 drop-shadow-md hover:scale-103 hover:text-white hover:border-white duration-100 ease-linear'>
                    <i className="fa-solid fa-plus"></i></button>
            </section>
        </section>
        : <div className='text-center'>
            <button onClick={addDeck} className='w-40 h-40 rounded-full bg-gray-200 text-4xl mb-5 hover:bg-gray-300 cursor-pointer'>
                <i className="fa-solid fa-plus opacity-70"></i></button>
            <p className='text-2xl'>Add Your First Deck</p>
        </div>
    )
}