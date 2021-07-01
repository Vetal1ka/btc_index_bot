const mongoose  = require('mongoose');  

//создаем схему

const Schema = mongoose.Schema;  
const usersSchema = new Schema ({

	 name: {

        type: String,
        required: true

	 },
	 
	 id: { 

        type: String,
        required: true,
        unique: true

	 },
	 
	 username: {

	 	type: String,
	 	default: ""
	 }

  });

 module.exports = mongoose.model('users',usersSchema) 


