import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonStyled } from "../Components/ButtonStyled";
import InputStyled from "../Components/InputStyled";

const SmallPageWrapper = styled.div`
  padding: var(--pad);
  display: flex;
  justify-content: center;
  align-items: center;

  div.sectionWrapper {
    width: 100%;
    max-width: var(--maxWidth);
  }

  form {
    text-align: center;
  }

  p {
    margin: 0;
    line-height: 1.5rem;
  }

  h1 {
    border-bottom: 2px solid var(--greyCyan);
  }

  section {
    padding: var(--pad);
    border: 2px solid var(--greyCyan);
    border-radius: var(--borad);
  }

  div.center {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

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
      });

      const parsedResponse = await response.json();

      // should get a token back
      if (parsedResponse.hasOwnProperty('token')) {
        localStorage.setItem("token", parsedResponse.token);
        toggleAuth(true);
      } else {
        throw new Error(parsedResponse);
      }

    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }

  }

  const {email, password} = inputs;
  return (
    <SmallPageWrapper>
      <div className="sectionWrapper">
        <section>
          <h1>Login</h1>
          <form onSubmit={onFormSubmit}>
            <InputStyled
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={onInputChange}
            />
            <InputStyled
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={onInputChange}
            />
            <div className="center">
              <ButtonStyled>Submit</ButtonStyled>
            </div>
          </form>
        </section>
        <div className="center">
          <Link to="/register"><ButtonStyled>Register</ButtonStyled></Link>
          <Link to="/">
            <ButtonStyled className="btn btn-primary">Browse Database</ButtonStyled>
          </Link>
        </div>
      </div>
    </SmallPageWrapper>
  );
};

export default Login;
