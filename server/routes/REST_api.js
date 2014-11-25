var express = require('express');
var router = express.Router();

var articles = require('../model/wikiarticles');

/* GET ALL Articles From The DataBase */
router.get('/articles', function (req, res) {
    articles.getAllArticles(function (err, wiki) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        //res.header("Content-type", "application/json");
        res.json(wiki);
    });
});

router.get('/articles/:title', function (req, res) {
    var titlepara = req.params.title;
    articles.getWiki(titlepara, function (err, title) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        //res.header("Content-type", "application/json");
        res.json(title);
    });
});

router.get('/categories/:title', function (req, res) {
    var titlepara = req.params.title;
    articles.getWikiByCat(titlepara, function (err, title) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(title));
    });
});

router.get('/categories', function (req, res) {
    console.log("In category detail");

    articles.getCategories(function (err, categories) {
        if (err) {
            console.log("Cateogory log");
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(categories));
    });
});

router.get('/addwiki', function (req, res) {
    console.log("In addwiki");

    articles.getCategories(function (err, categories) {
        if (err) {
            console.log("Cateogory log");
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(categories));
    });
});

router.put('/addtowiki', function (req, res) {
    articles.addtowiki(req.body, function (err) {
    });
    console.log(req.body);
    res.send("");
})


module.exports = router;
