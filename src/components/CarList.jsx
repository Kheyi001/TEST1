import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { GeoAlt } from 'react-bootstrap-icons';
import CarActions from './CarActions';

const CarList = ({ cars, onRatingChange }) => {

  const chunkDetails = (details, size) => {
    const chunkedArr = [];
    for (let i = 0; i < details.length; i += size) {
      chunkedArr.push(details.slice(i, i + size));
    }
    return chunkedArr;
  };

  return (
    <>
      {cars.map((car) => {
        const detailChunks = chunkDetails(car.details, 3);

        return (
          <React.Fragment key={car.id}>
            <Card className="car-card-new border-0">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img src={car.image} className="car-card-img-new" />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <div className="car-card-header-new">
                      <div>
                        <Card.Title className="car-card-title-new">{car.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted car-card-subtitle-new">
                          <i className="bi bi-calendar-event"></i> {car.date}
                        </Card.Subtitle>
                      </div>
                      <div className="car-price-new">
                        <h5>{car.price}</h5>
                        <p><GeoAlt className="location-icon"/> {car.location}</p>
                      </div>
                    </div>
                    <div className="car-details-new">
                      {detailChunks.map((chunk, index) => (
                        <React.Fragment key={index}>
                          <Row>
                            {chunk.map((detail, i) => (
                              <Col key={i} xs={4}>
                                <p>{detail.label} {detail.value}</p>
                              </Col>
                            ))}
                          </Row>
                          {index < detailChunks.length - 1 && <hr className="details-hr" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="car-footer-new">
                      <div className="car-rating-new">
                        <div>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < car.rating ? 'filled' : ''}`} onClick={() => onRatingChange(car.id, i + 1)}>★</span>
                          ))}
                        </div>
                        <div className="seller-details">
                          <span>{car.postalCode}</span>
                          <span>{car.cityName}</span>
                          <span>{car.seller}</span>
                        </div>
                      </div>
                      <CarActions actions={car.actions} />
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <hr />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CarList;
