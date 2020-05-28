import reduce from 'lodash/reduce';

export default arrayOfSensors => {
  return reduce(
    arrayOfSensors,
    (object, sensor) => {
      const reducedToType = object;
      reducedToType[sensor.type] = reducedToType[sensor.type] || [];
      reducedToType[sensor.type].push({
        id: sensor.id,
        room: sensor.room,
        name: sensor.name,
      });
      return reducedToType;
    },
    {},
  );
};
