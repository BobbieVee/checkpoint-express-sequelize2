var express = require('express');
var router = express.Router();

var db = require('../models/database');
var Article = require('../models/article');
var User = require('../models/user');

var Article = require('../models/article');

router.get('/articles', (req, res, next)=> {
	Article.findAll()
	.then((articles)=> {

		res.json(articles);
	})
	.catch(next);
});

router.get('/articles/:id', (req, res, next)=>{
	Article.findById(req.params.id*1)
	.then((article)=> {
		if (article){
			res.json(article);
		} else {
			res.sendStatus(404);
		}
	})
	.catch(next);
});

router.post('/articles',(req, res, next)=>{
	Article.create({title: req.body.title, content: req.body.content})
	.then((article)=>{
		res.send({
			message: 'Created successfully',
			article: article
		});
	})
	.catch(next);
});

router.put('/articles/:id', (req, res, next)=> {
	Article.update({title: req.body.title}, 
		{where: {id: req.params.id}})
	.then(()=>{
		return Article.findById(req.params.id)
	})
	.then((article)=>{
		res.send({
			message: 'Updated successfully',
			article: article
		});
	}) 	
	.catch(next);
});


module.exports = router;
