

const Filter = (props) => {
    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with:<input value={props.filter} onChange={props.filterChange} />
            </div>
    )
}

export default Filter