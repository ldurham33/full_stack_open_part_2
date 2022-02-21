function Language(languages) {
    //const fixedLanguages = Object.entries(languages).map(row => row[1])
    return (
        <div>
            <ul>
                {Object.entries(languages).map(language =>
                    <li key={language[0]}>{language[1]} </li>)}
                </ul>
        </div>
        )
        
 }
export default Language