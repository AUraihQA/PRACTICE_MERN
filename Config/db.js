'use strict';
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {DB_URL, DB_NAME} = require('../config/const.json');


const toDoSchema = new Schema ({
    description: {type :String, required: true},
    dateCreated: String,
    deadlineDate: String,
    done: Boolean
})

const ToDo = model('ToDo', toDoSchema);

mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}` ,{ useNewUrlParser:true, useUnifiedTopology: true} ,(err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('Connected');
    }
})

module.exports = {"ToDo": ToDo}