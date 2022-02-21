import functions from './functions'
import App from './App'
const Person_Render = (persons) => {
    const handleDelete = (event, id) => {
        console.log(App.persons)
        const newPersons = App.persons.filter(person => person.id !== id)
        console.log(id)
        functions.remove(id)
        App.setPersons(newPersons)
    }
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(person =>
                <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>)}
        </div>
    )
}

export default Person_Render