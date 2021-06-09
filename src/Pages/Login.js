import { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonStyled } from "../Components/ButtonStyled";

const Login = ({ toggleAuth }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });


  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onFormSubmit = async(event) => {
    event.preventDefault();
    const body = { password, email};

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json());

      // should get a token back
      if (response.hasOwnProperty('token')) {
        localStorage.setItem("token", response.token);
        toggleAuth(true);
      } else {
        throw new Error(response)
      }

    } catch (error) {
      console.error(error.message);
    }

  }

  const {email, password} = inputs;
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onInputChange}
        />
        <ButtonStyled>Submit</ButtonStyled>
      </form>
      <Link to="/register"><ButtonStyled>Register</ButtonStyled></Link>
    </>
  );
};

export default Login;
