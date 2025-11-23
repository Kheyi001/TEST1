import React, { useState, useRef, useMemo, useEffect } from 'react';
import { cars as initialCars } from './cars';
import './CarListings.css';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Calendar } from 'react-bootstrap-icons';
import Filters from './components/Filters';
import CarList from './components/CarList';

const CarListings = () => {
  const [allCars, setAllCars] = useState(initialCars);
  const prices = useMemo(() => allCars.map(car => parseInt(car.price.replace(/\s/g, ''))), [allCars]);
  const maxPrice = useMemo(() => Math.max(...prices), [prices]);
  const minPrice = useMemo(() => Math.min(...prices), [prices]);

  const [filteredCars, setFilteredCars] = useState(allCars);
  const [selectedDate, setSelectedDate] = useState('');
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const dateInputRef = useRef(null);

  useEffect(() => {
    let tempCars = allCars;

    if (selectedDate) {
      tempCars = tempCars.filter(car => car.date === selectedDate);
    }

    if (priceRange) {
      tempCars = tempCars.filter(car => {
        const carPrice = parseInt(car.price.replace(/\s/g, ''));
        return carPrice >= priceRange[0] && carPrice <= priceRange[1];
      });
    }

    if (selectedTypes.length > 0) {
      tempCars = tempCars.filter(car => selectedTypes.includes(car.type));
    }

    setFilteredCars(tempCars);
  }, [allCars, selectedDate, priceRange, selectedTypes]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
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
  }

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };

  const handleRatingChange = (carId, newRating) => {
    setAllCars(prevCars =>
      prevCars.map(car =>
        car.id === carId ? { ...car, rating: newRating } : car
      )
    );
  };

  return (
    <Container fluid className="car-listings-container">
      <Row>
        <Col md={3} className="filters-sidebar">
          <Filters 
            handlePriceChange={handlePriceRangeChange} 
            handleTypeChange={handleTypeChange}
            priceRange={priceRange} 
            minPrice={minPrice} 
            maxPrice={maxPrice} 
          />
        </Col>
        <Col md={9} className="car-listings">
          <div className="results-header">
            <p>{`${filteredCars.length} résultats de recherche sur QadiriLocation.ma`}</p>
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
                <InputGroup.Text onClick={handleIconClick} className="calendar-icon-wrapper" style={{ cursor: 'pointer' }}>
                  <Calendar />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <CarList cars={filteredCars} onRatingChange={handleRatingChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default CarListings;
