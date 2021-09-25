function Cards(props){
    const issue="Sample Issue"
    const author="Dinkan"
    return(
        <div class="card">
            <p>{issue}</p>
            <p>Opened by: {author}</p>

        </div>
    )
}

export default Cards