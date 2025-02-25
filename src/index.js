const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(cors());//para que se comunique con el frontend
app.use(morgan('dev'))
app.use(express.json());
app.use(taskRoutes)

//manejo de errores comunes
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
}) 

app.listen(4000);
console.log('server en 4000');