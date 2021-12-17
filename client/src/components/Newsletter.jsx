import styled from "styled-components";
import MailchimpSubscribe from "react-mailchimp-subscribe"

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: none;
  padding-left: 20px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: teal;
  color: white;
  position: relative;
  font-size: 16px;
`;

const KEY = process.env.REACT_APP_MAILCHIMP;

const Newsletter = () => {
  const CustomForm = ({ status, message, onValidated }) => {
    let email, name;
    const submit = () =>
      email &&
      name &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
        NAME: name.value
      });
  
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
        <Input ref={node => (name = node)} type="text" placeholder="Your name"/>
        <br />
        <Input ref={node => (email = node)} type="email" placeholder="Your email"/>
        <br />
        <Button onClick={submit}>
          Submit
        </Button>
        <div>
        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
        {status === "error" && (
          <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }}/>
        )}
        {status === "success" && (
          <div style={{ color: "green" }} dangerouslySetInnerHTML={{ __html: message }}/>
        )}
        </div>
      </div>
    );
  };
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <MailchimpSubscribe
        url={KEY}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </Container>
  );
};

export default Newsletter;
