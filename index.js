import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import Handlebars from 'handlebars';
import 'dotenv/config';
import cors from 'cors';


// import and create instance for routes and queyr files
import shoeApiQuery from './services/query.js';
import shoeApiRoutes from './routes/routes.js';




const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);



const shoeQuery =  shoeApiQuery(db);
// console.log(shoeQuery);
const shoeRoute = shoeApiRoutes(shoeQuery);
// console.log(shoeRoute);

const app = express();

app.engine(
  'handlebars',
  engine({
    handlebars: Handlebars,
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(cors());


// list all shoes in stock
app.get('/api/shoes',shoeRoute.allShoesRoutes);


// list all shoes for chosen brand
app.get('/api/shoes/brand/:brandname', shoeRoute.filterBrand
);



// // list all shoes for chosen size
app.get('/api/shoes/size/:size', shoeRoute.filterSize);

// // list all shoes for chosen color
app.get('/api/shoes/color/:color', shoeRoute.filterColor);

// // list all shoes for chosen brand and size
app.get('/api/shoes/brand/:brandname/size/:size/color/:color', shoeRoute.filterBrandAndSizeAndColor);

//this should update the stock when shoe is sold
app.post('/api/shoes/sold/:id');

// add a new shoe to the stock
app.post('/api/shoes',shoeRoute.addShoe)


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log('App started at port', PORT);
});
