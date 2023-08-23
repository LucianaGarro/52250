import express from 'express';
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();

try {
    await mongoose.connect('mongodb+srv://garrocp@gmail.com:xHCGeiHfxtywJWXe@cluster01.abysesb.mongodb.net/clase19?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder1234',
    resave: true,
    saveUninitialized: true
}))

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(8080);