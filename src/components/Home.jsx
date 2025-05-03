import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// This component serves as the home page of the application
// It provides a welcome message and a button to navigate to the product listing page.
function Home() {
  const navigate = useNavigate();
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Fake Store!</h1>
      <p>Browse, add, edit, and delete products using the Fake Store API.</p>
      <Button variant="primary" onClick={() => navigate('/products')}>
        Go to Product Listing
      </Button>
    </Container>
  );
}
export default Home;

