global.TEST_DATABASE = "mongodb://localhost/wiki";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var articles = mongoose.model("Articles");

describe('REST API for /articles', function () {
    //Start the Server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        articles.remove({}, function () {
            var array = [{
                "title": "Abu Dhabi",
                "url": "http://en.wikipedia.org/wiki/Abu_Dhabi",
                "abstract": "Abu Dhabi ( ¿Ab¿ ¿aby, literally &quot;Father of Gazelle&quot;) " +
                "is the largest of the seven emirates that comprise the United Arab Emirates" +
                " and was also the largest of the former Trucial States. Abu Dhabi is also a city of the" +
                " same name within the Emirate that is the capital of the country, in north central UAE.",
                "categories": [
                    "Amendments to the United States Constitution"]
            }, {
                "title": "An American in Paris",
                "url": "http://en.wikipedia.org/wiki/An_American_in_Paris",
                "abstract": "An American in Paris is a symphonic composition by American " +
                "composer George Gershwin which debuted in 1928. Inspired by Gershwin's time in Paris, " +
                "it is in the form of an extended tone poem evoking the sights and energy of the French capital in the 1920s.",
                "categories": [
                    "Symphonic poems"]
            }];
            articles.create(array, function (err) {
                done();
            });
        });
    })

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Should get 2 articles", function (done) {
        http.get("http://localhost:" + testPort + "/api/articles/", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                done();
            });
        })
    });

    it("Should get the first article with name Abu Dhabi", function (done) {
        http.get("http://localhost:" + testPort + "/api/articles/" + 'Abu Dhabi', function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(1);
                n[0].title.should.equal('Abu Dhabi');
                done();
            });
        })
    });

    it("Should retrieve two categories", function (done) {
        http.get("http://localhost:" + testPort + "/api/categories", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                done();
            });
        })
    });

});
