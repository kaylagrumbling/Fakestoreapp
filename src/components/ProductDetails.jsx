import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert, Modal } from 'react-bootstrap';

// This component fetches and displays product details based on the product ID from the URL.
// It also provides options to edit or delete the product, with a confirmation modal for deletion.
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  // Function to handle the deletion of the product
  // It sends a DELETE request to the API and navigates back to the product list on success.
  const handleDelete = async (id) => {     
    await fetch(
       `https://fakestoreapi.com/products/${id}`, 
       { method: "DELETE" }
    )
    .then(() => {      
       return setProduct(product.filter(product => product.id !== id))   
    })     
    .then(() => {
        navigate('/products'); // Redirect to the product list after deletion
      })
    .catch(() => setError('Failed to delete product'))
    .then(() => setLoading(false)) // Set loading to false after deletion
   
    .then(() => setProduct(null)) // Clear the product state after deletion
    .then(() => setShowModal(false)) // Close the modal after deletion
    .finally(() => setLoading(false)); // Set loading to false after deletion

  
    
}; 

  // Function to handle the edit button click
  // It navigates to the edit product page with the product ID.
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  // Render the product details in a card format
  // It includes the product image, title, description, category, and price.
  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={product.image} style={{ maxWidth: 200 }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Category: {product.category}</Card.Text>
          <Card.Text>Price: ${product.price}</Card.Text>
          <Button variant="warning" onClick={() => navigate(`/edit-product/${id}`)}>Edit</Button>{' '}
          <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
          <Button variant="secondary" onClick={() => navigate('/products')}>Add to Cart</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default ProductDetails;