import Form from "../components/Form"

function Register() :JSX.Element {
    return <Form route="/api/user/register/" method="register" />
}

export default Register