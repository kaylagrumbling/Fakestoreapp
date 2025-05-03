import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// This component allows users to edit product details
// It fetches the product data based on the ID from the URL and populates the form fields
function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(() => setSuccess(true));
  };

  // Render the edit product form with pre-filled values
  // It includes fields for title, price, description, and category.
  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      {success && <Alert variant="success">Product updated successfully!</Alert>}
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
        <Button type="submit">Update Product</Button>
      </Form>
    </Container>
  );
}
export default EditProduct;
