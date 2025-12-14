import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const { data } = await axios.get('/api/sweets');
        setSweets(data);
      } catch (error) {
        console.error("Error fetching sweets:", error);
      }
    };
    fetchSweets();
  }, []);

  return (
    <>
      <h1>Latest Sweets</h1>
      <Row>
        {sweets.map((sweet) => (
          <Col key={sweet._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Body>
                <Card.Title as="div"><strong>{sweet.name}</strong></Card.Title>
                <Card.Text as="div"><div className="my-3">Category: {sweet.category}</div></Card.Text>
                <Card.Text as="h3">₹{sweet.price}</Card.Text>
                
                {/* This button now takes you to the Cart Page */}
                <Link to={`/cart/${sweet._id}`}>
                    <Button variant="primary" disabled={sweet.countInStock === 0}>
                    {sweet.countInStock === 0 ? 'Out of Stock' : 'Buy Now'}
                    </Button>
                </Link>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;