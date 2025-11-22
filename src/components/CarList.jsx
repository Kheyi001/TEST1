import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Eye, PinMap } from 'react-bootstrap-icons';

const CarList = ({ cars }) => {
  return (
    <>
      {cars.map((car) => (
        <Card key={car.id} className="car-card-new">
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
                    <p><PinMap /> {car.location}</p>
                  </div>
                </div>
                <div className="car-details-new">
                  <Row>
                    {[0, 1, 2].map(col => (
                      <Col key={col} xs={4}>
                        {car.details.slice(col * 4, col * 4 + 4).map((detail, index) => (
                          <React.Fragment key={index}>
                            <p>{detail.label} {detail.value}</p>
                            {index < 3 && <hr className="details-hr"/>}
                          </React.Fragment>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </div>
                <div className="car-footer-new">
                    <div className="car-rating-new">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < car.rating ? 'filled' : ''}`}>★</span>
                        ))}
                        <span className="seller-info">{car.seller}</span>
                    </div>
                    <div className="car-actions-new">
                        <Eye className="action-icon" />
                        <div className="action-icon p-icon">P</div>
                        <i className="fas fa-exchange-alt action-icon"></i>
                    </div>
                </div>
              </Card.Body>
            </Col>
          </Row>
          <hr />
        </Card>
      ))}
    </>
  );
};

export default CarList;
