import { useState, useCallback, useEffect } from 'react';
import last from 'lodash/last';

let Dygraph;

if (process.env.BROWSER) {
  Dygraph = require('dygraphs').default; // eslint-disable-line global-require
}

const useChart = (container, options) => {
  const [g, setG] = useState(null);

  useEffect(() => {
    if (!container || !process.env.BROWSER) {
      return;
    }

    const data = [[1, 1]];
    const graph = new Dygraph(container, data, options);
    setG(graph);
  }, [container]);

  const updateChart = useCallback(
    data => {
      const color = last(data)[1] === 2 ? 'green' : 'red';
      g.updateOptions({ file: data, color });
    },
    [g],
  );

  return [g, updateChart];
};

export default useChart;
