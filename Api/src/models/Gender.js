const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("gender", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.ENUM('men', 'women', 'unisex'),
      defaultValue: 'unisex',
      allowNull: false,
    },
    // Se utiliza el atributo "set" para guardar los valores en minusculas. Así no hay problemas con las musyusculas y minusculas.
    set(value) {
      this.setDataValue('gender', value.toLowerCase());
    },
  });
};
