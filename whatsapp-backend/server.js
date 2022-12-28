// Importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';


// App config
const app = express();
const port = process.env.PORT || 9000;

// You pusher config
const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "SECRET_KEY",
  useTLS: USE_TLS, // optional, defaults to false
  cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
});


// Middleware
app.use(express.json());

app.use(cors());


// DB config
const connection_url='mongodb+srv://admin:<password>@cluster0.bs0mpww.mongodb.net/?retryWrites=true&w=majority';



mongoose.connect(connection_url, {
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true,
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!');
   });



const db = mongoose.connection;

db.once('open',()=> {
    console.log('DB connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log('A change occured',change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', 
              {
                name:messageDetails.name,
                message: messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
              }
            );
        } else {
            console.log('Error Triggering Pusher')
        }
    });
});


//Api routes
app.get('/',(req,res) => res.status(200).send('Hello Programmers'));


app.get('/messages/sync',(req, res) => {
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else {
            res.status(200).send(data);
        }
    });
});


app.post('/messages/new',(req,res) => {
    // Post request adds data to the database,send videos to our video collection
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(`New message created:\n ${data}`);
        }
    });
});




// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`)); 

