import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Slider.css';

const Filters = ({ handlePriceChange, handleTypeChange, priceRange, minPrice, maxPrice }) => {
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
          <span>{priceRange[0]} DH</span>
          <span>{priceRange[1]} DH</span>
        </div>
        <Slider
          range
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
      {/* Add other filters here */}
    </>
  );
};

export default Filters;
