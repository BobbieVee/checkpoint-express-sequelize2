'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
	title: {
		type: Sequelize.STRING,
		validate: {notEmpty: true}
	},
	content: {
		type: Sequelize.TEXT, 
		allowNull: false
	}


}, {
	getterMethods: {
		snippet: function(){
			return (this.content)?this.content.slice(0,23) + '...':'';
		}
	},
	instanceMethods: {
		truncate: function(length){
			this.content = (this.content.slice(0,length));

		}
	}
});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
