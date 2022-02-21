const Course = ({ course }) => {
    const sum = course.parts.map(part => part.exercises).reduce((total, amount) => total + amount)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <p key={part.id}>{part.name} {part.exercises}</p>)}
                <li> total of {sum} </li>
            </div>
    )
}


export default Course;
