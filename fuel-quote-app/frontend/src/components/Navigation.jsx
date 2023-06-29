import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    let navigate = useNavigate();

    return (
        <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
            <Container>
                <Navbar.Brand href='/'>Fuel Quote App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/quote'>Fuel Quote Form</Nav.Link>
                        <Nav.Link href='/history'>Fuel Quote History</Nav.Link>
                        <Nav.Link href='/profile'>Profile</Nav.Link>
                    </Nav>
                    <Stack direction="horizontal" gap={3}>
                        <Button 
                            variant='light'
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button 
                            variant='light'
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Sign In
                        </Button>
                    </Stack>
                    {/* <Button 
                            variant='light'
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Sign Out
                    </Button> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}