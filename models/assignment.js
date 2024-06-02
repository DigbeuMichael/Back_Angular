let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//let ObjectId = require('mongodb').ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

/*let AssignmentSchema = Schema({
    //_id: ObjectId,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    }, {collection: 'assignments'});*/

    let AssignmentSchema = Schema({
        dateDeRendue: Date,
        nom: String, 
        auteur_nom: String,
        auteur_photo: String,
        matiere: String,
        imageMatiere: String,
        photoProfesseur: String,
        note: {
            type: Number,
            min: 0,
            max: 20,
            required: true
        },
        rendu: {

                type: String,
                enum: ['En cours', 'Rendu'],
                default: 'En cours'
        },
        remarques: String
        }, {collection: 'assignments'});
    


AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
