let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const userRoute = require('./routes/authRoute')
const userAssignment = require('./routes/assignementRoute')

// port sur lequel le serveur va tourner
let port = process.env.PORT || 8010;

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true); 

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri = 'mongodb+srv://mb:P7zM3VePm0caWA1L@cluster0.zqtee.mongodb.net/assignments?retryWrites=true&w=majority';
//const uri = 'mongodb+srv://mb:toto@cluster0.hswi4vv.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://digbeu:charma_15@cluster0.ctzxfh2.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:" + port + "/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Les routes

app.use("/api/user",userRoute);
app.use("/api/assignments",userAssignment);
  
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


