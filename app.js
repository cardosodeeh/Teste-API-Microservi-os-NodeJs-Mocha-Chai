import express from 'express';

const app = express();

app.get("/hello", (req, res) => {
    res.status(200).json({ message: "Olá, Nodejs com express!" })
})

app.listen(3000);

module.exports = app;

// var soma = function (v1, v2) {
//     return v1+ v2;
// }
//
// let soma = (v1, v2) => {
//     return v1 + v2;
// }