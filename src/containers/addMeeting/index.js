import React, { useState, useEffect } from 'react';
import './index.css';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

const AddMeeting = props => {
  const [desc, setDesc] = useState('');

  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [data, setData] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  let selectedStartTime = startTime.toString().substring(16, 21);
  let selectedEndTime = endTime.toString().substring(16, 21);

  let getfetchedDate = new Date(startDate).toLocaleDateString();

  let fetchStartDate = getfetchedDate.split(/\//);
  let changeDateFormat = [
    fetchStartDate[1],
    fetchStartDate[0],
    fetchStartDate[2],
  ].join('/');
  const url = `http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${changeDateFormat}`;

  useEffect(() => {
    getData();
  }, [changeDateFormat]);

  const getData = () => {
    axios
      .get(url)
      .then(response => {
        const getData = response.data;
        setData(getData);
        setLoading(false);
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const timeStamp = strDate => {
    const dateTime = Date.parse(strDate);
    return dateTime / 1000;
  };

  const handleSubmit = () => {
    setLoading(true);
    getData();

    const overlappingMeeting = data.find(time => {
      return (
        (timeStamp(`${getfetchedDate} ${selectedStartTime}`) >
          timeStamp(`${getfetchedDate} ${time.start_time}`) &&
          timeStamp(`${getfetchedDate} ${selectedStartTime}`) <
            timeStamp(`${getfetchedDate} ${time.end_time}`)) ||
        (timeStamp(`${getfetchedDate} ${selectedEndTime}`) >
          timeStamp(`${getfetchedDate} ${time.start_time}`) &&
          timeStamp(`${getfetchedDate} ${selectedEndTime}`) <
            timeStamp(`${getfetchedDate} ${time.end_time}`))
      );
    });
    if (overlappingMeeting) {
      setDesc(overlappingMeeting.description);
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      setDesc('');
    }
  };

  let minStartTime = startTime.toString().substring(16, 21).split(':');

  const minTime = new Date(2000, 1, 1, minStartTime[0], minStartTime[1]);
  const maxTime = new Date(2000, 1, 1, 23, minStartTime[1]);
  return (
    <div className='add-meeting'>
      <Container>
        <Form action='/post'>
          <div className='meeting-time ml-5 mt-2 p-2'>
            <div className='first-block'>
              <div className='meeting-date p-2'>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </div>
            </div>

            <div className='second-block mt-5'>
              <div className='start-time p-2'>
                <DatePicker
                  selected={startTime}
                  onChange={time => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption='Time'
                  dateFormat='h:mm aa'
                  placeholderText='Start Time'
                />
              </div>
              <div className='end-time p-2'>
                <DatePicker
                  selected={endTime}
                  onChange={time => {
                    setEndTime(time);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption='Time'
                  dateFormat='h:mm aa'
                  placeholderText='End Time'
                  minTime={minTime}
                  maxTime={maxTime}
                />
              </div>
            </div>
            <div className='third-block mt-5'>
              <p>{desc}</p>
            </div>
            {errorMsg ? (
              <h6 className='mt-2' style={{ color: 'red' }}>
                **Slot not available
              </h6>
            ) : (
              ''
            )}
          </div>
          <div className='save-btn'>
            <Button
              type='submit'
              className='w-25'
              onClick={handleSubmit}
              disabled={loading}>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddMeeting;
