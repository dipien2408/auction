import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const LinkItem = styled.a`
  margin: 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async (e)=> {
    e.preventDefault();
    setError(false);
    if(password !== confirmPassword) {
      return setError(true);
    }
    try {
      const res = await publicRequest.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login')
    } catch(err) {
      setError(true);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
          <Input placeholder="confirm password" type="password" onChange={e=>setConfirmPassword(e.target.value)}/>
          <Button onClick={handleClick}>CREATE</Button>
          <br/>
          <Link className="link" to="/login">
            <LinkItem>ALREADY HAVE AN ACCOUNT?</LinkItem>
          </Link>
          <Link className="link" to="/">
            <LinkItem>BACK TO HOMEPAGE?</LinkItem>
          </Link>
          <br/>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
