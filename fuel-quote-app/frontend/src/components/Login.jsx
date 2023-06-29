import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [putData, putQuoteData] = useState({});
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if(form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    fetch('http://localhost:3059/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(putData)
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };


  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleUsernameChange = (event) => {
		const { name, value } = event.target;
		if(name === "username") {
			const username = value;
			putQuoteData({ ...putData, username });
		}
    }

	const handlePasswordChange = (event) => {
		const { name, value } = event.target;
		if(name == "password") {
			const password = value;
			putQuoteData({ ...putData, password });
		}
  }

  return (
    <>
      <h1>Login Form</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='text' 
              name='username'
              placeholder='Username' 
              required
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type='invalid'>
              Username required.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='password' 
              name='password'
              placeholder='Password' 
              required
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type='invalid'>
              Password required.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type='submit' variant='outline-dark'>Login</Button>{' '}
      </Form>
    </>
  );
};