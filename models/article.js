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
	}, 
	version: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}, 
	tags: {
		type: Sequelize.ARRAY(Sequelize.STRING), 
		defaultValue: []
	}
}, {
	hooks: {
		beforeUpdate: function(Article){
			// this.version = this.version + 1;
			Article.version++ ;
		}
	},
	getterMethods: {
		snippet: function(){
			return (this.content)?this.content.slice(0,23) + '...':'';
		}
		,
		tags: function(){
			return this.getDataValue("tags").join(', ');
		}
	},
	instanceMethods: {
		truncate: function(length){
			this.content = (this.content.slice(0,length));

		}
	},
	classMethods: {
		findByTitle: function(title){
			return Article.findOne({where: {title: title}});
		}
	}
});

Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
