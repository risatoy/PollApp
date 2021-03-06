module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  });

  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
    models.Polls.belongsTo(models.User);
  }

  return Polls;
};
