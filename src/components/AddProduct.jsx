import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

// This component allows users to add a new product
// It includes a form with fields for title, price, description, and category
// Upon submission, it sends a POST request to the API to create a new product
function AddProduct() {
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(() => setSuccess(true));
  };

  // Render the add product form with fields for title, price, description, and category
  // It includes a submit button to create the new product
  // On successful submission, a success message is displayed
  return (
    <Container className="mt-4">
      <h2>Add Product</h2>
      {success && <Alert variant="success">Product created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" value={form.price} onChange={handleChange} required type="number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={form.description} onChange={handleChange} required as="textarea" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}
export default AddProduct;
