import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import size from 'lodash/size';
import Sensor from './Sensor';

const heightOfRow = { height: '22rem' };

export default function SensorsRow({ sensors }) {
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const pageHandler = useCallback(
    event => {
      let newPage;
      const text = event.target.innerHTML;
      switch (text) {
        case 'Next':
          newPage = page <= size(sensors) / pageSize - 1 ? page + 1 : page;
          break;
        case 'Prev':
          newPage = page > 0 ? page - 1 : page;
          break;
        default:
          newPage = page;
      }
      setPage(newPage);
    },
    [page],
  );

  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={heightOfRow}
    >
      <div className="d-flex justify-content-center">
        <h5>{`Page ${page + 1} from ${Math.ceil(
          size(sensors) / pageSize,
        )}`}</h5>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {map(Array.from(sensors).splice(page * pageSize, pageSize), sensor => {
          return (
            <Sensor
              key={`${sensor.id}`}
              id={sensor.id}
              name={sensor.name}
              room={sensor.room}
            />
          );
        })}
      </div>
      <div className="d-flex justify-content-center mt-2 mb-2">
        <button
          className="btn btn-outline-dark btn-lg mr-2"
          onClick={pageHandler}
          type="button"
        >
          Prev
        </button>
        <button
          className="btn btn-outline-dark btn-lg"
          onClick={pageHandler}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

SensorsRow.propTypes = {
  sensors: PropTypes.arrayOf(PropTypes.object).isRequired,
};
