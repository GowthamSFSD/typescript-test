import app from "./app";
import sequelize from "./config/database";
// import updateQuery from "./scripts/updateSchema";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("🔗 Connecting to the database...");
    await sequelize.authenticate();
    console.clear();
    console.log("✅ DB connected");
    // await sequelize.sync({ force: false });
    // await updateQuery();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error("❌ Error starting server:", err.message);
  }
};

startServer();
