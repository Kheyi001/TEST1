import React, { useState, useRef, useMemo } from 'react';
import { cars } from './cars';
import './CarListings.css';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Calendar } from 'react-bootstrap-icons';
import Filters from './components/Filters';
import CarList from './components/CarList';

const CarListings = () => {
  const prices = useMemo(() => cars.map(car => parseInt(car.price.replace(/\s/g, ''))), []);
  const maxPrice = useMemo(() => Math.max(...prices), [prices]);
  const minPrice = useMemo(() => Math.min(...prices), [prices]);

  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedDate, setSelectedDate] = useState('');
  const [price, setPrice] = useState(maxPrice);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const dateInputRef = useRef(null);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    filterCars(date, price, selectedTypes);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    filterCars(selectedDate, newPrice, selectedTypes);
  };

  const handleTypeChange = (event) => {
    const type = event.target.id;
    const newSelectedTypes = [...selectedTypes];
    if (event.target.checked) {
      newSelectedTypes.push(type);
    } else {
      const index = newSelectedTypes.indexOf(type);
      if (index > -1) {
        newSelectedTypes.splice(index, 1);
      }
    }
    setSelectedTypes(newSelectedTypes);
    filterCars(selectedDate, price, newSelectedTypes);
  }

  const filterCars = (date, price, types) => {
    let tempCars = cars;

    if (date) {
      tempCars = tempCars.filter(car => car.date === date);
    }

    if (price) {
      tempCars = tempCars.filter(car => parseInt(car.price.replace(/\s/g, '')) <= price);
    }

    if (types.length > 0) {
      tempCars = tempCars.filter(car => types.includes(car.type));
    }

    setFilteredCars(tempCars);
  }

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };

  return (
    <Container fluid className="car-listings-container">
      <Row>
        <Col md={3} className="filters-sidebar">
          <Filters 
            handlePriceChange={handlePriceChange} 
            handleTypeChange={handleTypeChange}
            price={price} 
            minPrice={minPrice} 
            maxPrice={maxPrice} 
          />
        </Col>
        <Col md={9} className="car-listings">
          <div className="results-header">
            <p>{`${filteredCars.length} résultats de recherche sur tomobile.ma`}</p>
            <div className="search-and-sort">
              <Button variant="warning">SAUVEGARDER LA RECHERCHE</Button>
              <InputGroup className="date-filter">
                <Form.Control 
                  ref={dateInputRef}
                  type="text" 
                  placeholder="Date de publication" 
                  onFocus={(e) => e.target.type = 'date'} 
                  onBlur={(e) => e.target.type = 'text'} 
                  onChange={handleDateChange}
                  value={selectedDate}
                />
                <InputGroup.Text onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                  <Calendar />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <CarList cars={filteredCars} />
        </Col>
      </Row>
    </Container>
  );
};

export default CarListings;
