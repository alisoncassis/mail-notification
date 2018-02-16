const app = require('./config/express');

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));
