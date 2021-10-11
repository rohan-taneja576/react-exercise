import React, { useEffect, useState } from 'react';
import DateCarousel from '../../components/DateCarousel';
import axios from 'axios';
import './index.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListItems from '../../components/ListItems';
import Counter from '..';

const Home = props => {
  let monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let currentDate = new Date();

  const [day, setDay] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const getDate = day + '/' + Number(month + 1) + '/' + year;
  const [data, setData] = useState([]);
  const url = `http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${getDate}`;

  useEffect(() => {
    getData();
  }, [getDate]);

  const getData = () => {
    axios
      .get(url)
      .then(response => {
        const getData = response.data;
        setData(getData);
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const timeStamp = strDate => {
    const dateTime = Date.parse(strDate);
    return dateTime / 1000;
  };

  const sortedData = data.sort((a, b) => {
    const dateFetch = month + '/' + day + '/' + year;
    if (
      timeStamp(`${dateFetch} ${a.start_time}`) >
      timeStamp(`${dateFetch} ${b.start_time}`)
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <>
      <DateCarousel
        day={day}
        month={monthsArray[month]}
        year={year}
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear}
      />
      <ListItems data={data} />
      <div className='add-meeting-btn'>
        <Link
          to={{
            pathname: '/addMeeting',
            aboutProps: {
              data: data,
            },
          }}>
          <Button type='submit'>Add Meeting</Button>
        </Link>
      </div>
      <Counter />
    </>
  );
};

export default Home;
