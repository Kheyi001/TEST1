import React from 'react';
import { Eye, Heart, Plus, ArrowLeftRight } from 'react-bootstrap-icons';

const CarActions = ({ actions }) => {
  return (
    <div className="car-actions-new">
      {actions.map((action, index) => {
        switch (action) {
          case 'eye':
            return <Eye key={index} className="action-icon" />;
          case 'p':
            return <div key={index} className="action-icon p-icon">P</div>;
          case 'exchange':
            return <ArrowLeftRight key={index} className="action-icon" />;
          case 'heart':
            return <Heart key={index} className="action-icon" />;
          case 'plus':
            return <Plus key={index} className="action-icon" />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default CarActions;
