module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("rooms", {
    room: {
      type: Sequelize.STRING,
    },
  });

  return Test;
};
