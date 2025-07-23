import { QueryInterface, DataTypes } from "sequelize";
import sequelize from "../config/database";

const updateQuery = async () => {
  const queryInterface: QueryInterface = sequelize.getQueryInterface();
  await queryInterface.addColumn("users", "phone", {
    type: DataTypes.STRING,
    allowNull: true,
  });

  console.log("Phone column added");
};

export default updateQuery;
