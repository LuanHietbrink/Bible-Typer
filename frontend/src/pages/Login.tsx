import LoginRegisterForm from "../components/Form";

function Login(): JSX.Element {
    return <LoginRegisterForm route="/api/token/" method="login" />;
}

export default Login;

