const app = require('./App');
const { sequelize } = require('./Database');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('✅ MySQL Conectado');
  app.listen(PORT, () => console.log(`🚀 Web en http://localhost:${PORT}`));
}).catch(err => console.log('❌ Error:', err));