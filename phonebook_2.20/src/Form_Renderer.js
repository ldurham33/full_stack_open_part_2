const Form_Renderer = (props) => {
    return (
        <div>
            <form onSubmit={props.add}>
                <div>
                name: <input value={props.text} onChange={props.nameChange} />
                </div>
                <div>
                number: <input value={props.number} onChange={props.numberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            </div>
    )
}

export default Form_Renderer