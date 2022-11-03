const React = require('react')
const breads = require('../controllers/breads_controller')
const Default = require('./layouts/Default')

function Show({ bread, breadsByBakerArray }) {
    let otherBreads = breadsByBakerArray.map(breadByBaker => {
        return (
        <li>
            {breadByBaker.name}
        </li>
    )
    })

    return (
  
        <Default>
            <h2>Show Page</h2>
            <h3>{bread.name}</h3>
            <p>
                and it
                {
                    bread.hasGluten
                        ? <span> does </span>
                        : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name} />
            <p>{bread.getBakedBy()}</p>
            <div>
                Other breads By {bread.baker.name}:
                
                <ul>
                    {otherBreads}
                </ul>
            </div>

            <a href={`/breads/${bread.id}/edit`}> <button>Edit</button> </a>

            <form action={`/breads/${bread.id}?_method=DELETE`} method='POST'>
                <input type="submit" value="DELETE" />
            </form>
        </Default>
    )
}

module.exports = Show