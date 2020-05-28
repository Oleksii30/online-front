import React, { useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import map from 'lodash/map';
import keys from 'lodash/keys';
import startCase from 'lodash/startCase';
import s from './OnlineStatus.css';
import useFetch from './hooks/useFetch';
import ReduceSensorsToType from './utils/ReduceSensorsToType';
import Loading from './components/Loading';
import Error from './components/Error';
import { securityStatusUrl } from '../../client-config';
import SensorsRow from './components/SensorsRow';

function OnlineStatus() {
  useStyles(s);
  const [{ result, loading, error }, doFetch] = useFetch(
    `${securityStatusUrl}sensor/`,
  );

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  let data = result;
  data = ReduceSensorsToType(data);
  const sensorTypes = keys(data);

  return (
    <div className={s.root}>
      <div className={s.container}>Check online status</div>
      {loading && <Loading />}
      {error && <Error />}
      {result &&
        map(sensorTypes, type => {
          return (
            <div key={type}>
              <h4 className="mb-4 mt-2">{startCase(type)} sensors</h4>
              <SensorsRow sensors={data[type]} />
            </div>
          );
        })}
    </div>
  );
}

OnlineStatus.whyDidYouRender = true;
export default React.memo(OnlineStatus);
