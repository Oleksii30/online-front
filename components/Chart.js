import React, { useEffect, useRef } from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import useChart from '../hooks/useChart';

export default function Chart({ statuses }) {
  const chartContainer = useRef(null);

  let data = map(statuses, status => {
    const axisY = status.status === 'online' ? 2 : 1;
    const axisX = new Date(status.createdAt);
    return [axisX, axisY];
  });

  const rightGap = 0;
  const chartHeight = 150;
  const chartWidth = 350;
  const low = 0;
  const high = 3;
  const valueRange = [low, high];
  const labels = ['Time', 'State'];
  const legend = 'never';
  const color = 'red';

  const options = {
    drawPoints: true,
    valueRange,
    labels,
    color,
    rightGap,
    height: chartHeight,
    width: chartWidth,
    legend,
    axes: {
      y: {
        ticker() {
          return [
            { v: 0, label: '' },
            { v: 2, label: 'online' },
            { v: 1, label: 'offline' },
          ];
        },
      },
    },
  };

  const [g, updateChart] = useChart(chartContainer.current, options);

  useEffect(() => {
    if (!g) {
      return;
    }
    if (data.length === 0) {
      data = [[1, 1]];
    }
    updateChart(data);
  }, [g, data]);

  return <div ref={chartContainer} />;
}

Chart.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
