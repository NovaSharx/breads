const React = require('react')
const Default = require('./layouts/default')

function Index({breads, title}) {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (<li key={index}>
                            <a href={`/breads/${bread.id}`}>
                                {bread.name}
                            </a>
                            <ul>
                                <li>{bread.getBakedBy()}</li>
                            </ul>
                        </li>)
                    })
                }
            </ul>
            
            <div className='newButton'>
                <a href="/breads/new"> <button>Add a new bread</button> </a>
            </div>
            <div className='newButton'>
                <a href="/breads/data/seed"> <button>Add a sample breads</button> </a>
            </div>
        </Default>
    )
}

module.exports = Index