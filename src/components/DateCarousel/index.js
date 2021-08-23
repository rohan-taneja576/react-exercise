import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DateCarousel = props => {
  const { ...resData } = props;
  const finalDate = resData.day + ' ' + resData.month + ' ' + resData.year;
  let getdaysInMonth;

  function daysInMonth(month, year) {
    getdaysInMonth = new Date(year, month, 0).getDate();
    return getdaysInMonth;
  }

  const nextDateHandler = () => {
    if (resData.day >= daysInMonth(resData.month, resData.year)) {
      resData.setDay(1);
      resData.setMonth(resData.month + 1);
    } else resData.setDay(day => day + 1);
    if (resData.month > 12) {
      resData.setMonth(1);
      resData.setYear(resData.year + 1);
    }
  };

  const prevDateHandler = () => {
    if (resData.day === 1) {
      resData.setDay(daysInMonth(resData.month, resData.year));
      resData.setMonth(resData.month - 1);
    } else {
      resData.setDay(day => day - 1);
    }
  };

  return (
    <Container className='container d-flex justify-content-center'>
      <Row className='row mt-5 p-3 text-center row w-50'>
        <Col>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color='#2e5bff'
            cursor='pointer'
            onClick={prevDateHandler}
          />
        </Col>
        <Col style={{ color: '#2e5bff' }}>
          <h4>{finalDate}</h4>
        </Col>
        <Col>
          <FontAwesomeIcon
            icon={faArrowRight}
            color='#2e5bff'
            cursor='pointer'
            onClick={nextDateHandler}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DateCarousel;
