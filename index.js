const express = require("express");
const app = require("./src/app");

const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
