import React, { useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CartItem";

import { random, commerce, datatype } from "faker";
import { Container, Col, Row } from "reactstrap";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  const fetchPhotos = async () => {
    var config = {
      method: 'get',
      url: 'https://api.pexels.com/v1/search?query=mobile&per_page=6&page=1',
      headers: { 
        'Authorization': process.env.REACT_APP_API_KEY,
      }
    };
    
    Axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      const {photos} = response.data;
      console.log(photos);
      const allProduct = photos.map((photo) => ({
          smallImage: photo.src.medium,
          tinyImage: photo.src.tiny,
          productName: random.word(),
          productPrice: commerce.price(),
          id: datatype.uuid(),
        }));
    
        setProduct(allProduct);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
