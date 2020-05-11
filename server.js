const app = require('./app');
const port = process.env.PORT || 5000;


// Set up server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});