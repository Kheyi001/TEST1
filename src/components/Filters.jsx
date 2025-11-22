import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Filters = ({ handlePriceChange, handleTypeChange, price, minPrice, maxPrice }) => {
  return (
    <>
      <Button variant="warning" className="back-to-form-btn">RETOURNER AU FORMULAIRE</Button>
      <h5>Types de véhicules</h5>
      <Form>
        {['CITADINE', 'BERLINE', 'SUV/4X4', 'CABRIOLET', 'MONOSPACE', 'UTILITAIRE', 'PICK-UP', 'BREAK'].map((type) => (
          <Form.Check
            key={type}
            type="checkbox"
            id={type}
            label={type}
            className="vehicle-type-checkbox"
            onChange={handleTypeChange}
          />
        ))}
      </Form>
      <div className="price-filter">
        <h5>Prix</h5>
        <div className="price-range">
          <span>{minPrice} DH</span>
          <span>{price} DH</span>
        </div>
        <Form.Range 
          onChange={handlePriceChange} 
          min={minPrice} 
          max={maxPrice} 
          value={price} 
        />
      </div>
      {/* Add other filters here */}
    </>
  );
};

export default Filters;
