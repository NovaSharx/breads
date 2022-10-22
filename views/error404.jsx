const React = require('react')
const Default = require('./layouts/default')

function Error404() {
    return (
        <Default>
            <h1>ERROR 404: BREAD NOT FOUND</h1>
            <img src="https://media.istockphoto.com/illustrations/no-bread-illustration-id166009132?k=20&m=166009132&s=170667a&w=0&h=d-F_snlIAp3NJvOKvhVcm9gO_TmsCOpbH91Rz-fB2Bk=" alt="Lost Bread" />
            <h2>Oops! The bread you are looking for does not exist..</h2>
        </Default>
    )
}

module.exports = Error404