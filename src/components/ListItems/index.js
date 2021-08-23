import React from 'react';

const ListItems = props => {
  const { data } = props;
  return (
    <div className='list-data'>
      {data.map(item => (
        <div className='list-item'>
          <div className='time-block'>
            {item.start_time}
            {item.start_time.split(':')[0] < 12 ? 'AM' : 'PM'} - {item.end_time}
            {item.end_time.split(':')[0] < 12 ? 'AM' : 'PM'}
          </div>
          <div className='desc-block'>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
