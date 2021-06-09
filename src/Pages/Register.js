import { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonStyled } from "../Components/ButtonStyled";

const Register = ({ toggleAuth }) => {

  const [ inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onInputChange = (event) => {
    setInputs({...inputs, [event.target.name] : event.target.value})
  }

  const onSubmitForm = async(event) => {
    event.preventDefault();
    try {
      const body = { email, password, name}

      const response = await fetch("http://localhost:4000/auth/register", {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
      }).then(res => res.json());

      if (response.hasOwnProperty('token')) {
        localStorage.setItem("token", response.token);
        // safe to toggle auth true since we just got a token from the server
        toggleAuth(true);
      } else {
        // no token from the server
        // relay the server's error message to the console
        throw new Error(response);
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  const { email, password, name } = inputs;
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
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
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={onInputChange}
        />
        <ButtonStyled>Submit</ButtonStyled>
      </form>
      <Link to="/login"><ButtonStyled>Log in</ButtonStyled></Link>
    </>
  );
};

export default Register;