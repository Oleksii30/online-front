import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import classNames from 'classnames';
import useServerSentEvents from '../hooks/useSse';
import { securityStatusUrl } from '../../../client-config';
import Chart from './Chart';

export default function Sensor({ id, name, room }) {
  const [limit, setLimit] = useState(0);
  const url = `${securityStatusUrl}status/${id}?limit=${limit}`;
  const [statuses] = useServerSentEvents(url);
  const status = !isEmpty(statuses) ? last(statuses).status : 'offline';
  const badgeStatus = status === 'online' ? 'badge-success' : 'badge-danger';
  const newLimitFor1 = 1;
  const newLimitFor5 = 5;
  const newLimitFor30 = 30;

  const limitHandler = useCallback(event => {
    let newLimit;
    const text = event.target.innerHTML;
    switch (text) {
      case '30 min':
        newLimit = newLimitFor30;
        break;
      case '5 min':
        newLimit = newLimitFor5;
        break;
      case '1 min':
        newLimit = newLimitFor1;
        break;
      default:
        newLimit = newLimitFor1;
    }
    setLimit(newLimit);
  }, []);

  return (
    <div
      className={classNames(
        'd-flex',
        'justify-content-center',
        'flex-column',
        'ml-2',
      )}
    >
      <div className={classNames('card', 'border-dark')}>
        <div className="card-header bg-dark text-white">
          <h5>{`${room} ${name}`}</h5>
        </div>
        <span className={classNames(['badge', 'badge-success', badgeStatus])}>
          {status}
        </span>
      </div>
      <div className={classNames('d-flex', 'justify-content-center', 'mt-1')}>
        <Chart statuses={statuses} />
      </div>
      <div
        className={classNames('d-flex', 'justify-content-end', 'mt-1', 'ml-1')}
      >
        <button className="btn btn-light" onClick={limitHandler} type="button">
          1 min
        </button>
        <button className="btn btn-light" onClick={limitHandler} type="button">
          5 min
        </button>
        <button className="btn btn-light" onClick={limitHandler} type="button">
          30 min
        </button>
      </div>
    </div>
  );
}
Sensor.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};
