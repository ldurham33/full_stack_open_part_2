import { useState, useEffect } from 'react'
//import Person_Render from './Person_Render'
import Form_Renderer from './Form_Renderer'
import Filter from './Filter'
import axios from 'axios'
import functions from './functions'
const GoodNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className='good'>
            {message}
        </div>
    )
}
const BadNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className='error'>
            {message}
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [search, setSearch] = useState('')
    const [newNumber, setNewNumber] = useState('(000)-000-0000')
    const [status, setStatus] = useState(null)
    const [errorMessage,setErrorMessage] = useState(null)
    //const [type, setType] = useState('nothing')
    useEffect(() => {
        functions
            .getAll()
            .then(initial => {
                setPersons(initial.data)
            })
        
    }, [])
    const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    const handleAdd = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
            id: persons[persons.length-1].id + 1
        }
        if (persons.map(person => person.name).indexOf(newName) > -1) {
            if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
                const update = {
                    name: newName,
                    number: newNumber,
                    id: persons[persons.map(person => person.name).indexOf(newName)].id
                }
                functions.update(persons[persons.map(person => person.name).indexOf(newName)].id, update).catch(error => {
                    setErrorMessage(
                        `Information of ${update.name} was already removed from server`
                    )
                })
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                let updatedPersons = persons
                updatedPersons[persons.map(person => person.name).indexOf(newName)] = update
                setPersons(updatedPersons)
            }
            setNewName('')
            setNewNumber('')
        } else {
            setPersons(persons.concat(person))
            functions.create(person)
            setNewName('')
            setNewNumber('')
            setStatus(
                `'${person.name}' was succesfully added`
            )
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setSearch(event.target.value)
    }
    const handleDelete = (id,name) => {
        console.log(id)
        const newPersons = persons.filter(person => person.id !== id)
        if (window.confirm(`Delete ${name}?`)) {
            functions.remove(id)
            setPersons(newPersons)
        }
    }
    return (
        <div>
            <GoodNotification message={status} />
            <BadNotification message={errorMessage} />
            {Filter({
                filter: search,
                filterChange: handleFilterChange,})}
            {Form_Renderer(
                {
                    add: handleAdd,
                    text: newName,
                    nameChange: handleNameChange,
                    number: newNumber,
                    numberChange: handleNumberChange
                })}
            <div>
                <h2>Numbers</h2>
                {peopleToShow.map(person =>
                    <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id,person.name)}>delete</button></p>)}
            </div>
                </div>
    )
}

export default App