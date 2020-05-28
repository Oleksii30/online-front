import { useState, useEffect, useCallback } from 'react';

const useServerSentEvents = url => {
  const [statuses, setStatuses] = useState([]);
  const [eventSource, setEventSource] = useState(null);

  const messageListener = useCallback(event => {
    const parsedData = JSON.parse(event.data);
    // eslint-disable-next-line no-shadow
    setStatuses(statuses => {
      return statuses.concat(parsedData);
    });
  }, []);

  useEffect(() => {
    if (eventSource) {
      eventSource.close();
      setStatuses([]);
    }

    const events = new EventSource(url);
    setEventSource(events);
    events.addEventListener('message', messageListener);

    return () => {
      events.close();
      events.removeEventListener('message', messageListener);
    };
  }, [url]);

  return [statuses];
};

export default useServerSentEvents;
