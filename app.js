const express = require('express');
const request = require('request');
const basicAuth = require('express-basic-auth')

var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app.listen(8081);

var userData = {};

/**
 *  * /:
 *   get:
 *     summary: Returning list of repositories of the specified query parameter
 *   parameters:
 * @param {query} search term
 * @returns 
 *    response:
 *         description: list of repositories of the specified query parameter
 */

app.get('/search', (req, res) => {
    var query = req.query.query;
    if (query == null) {
        res.end("No query provided!");
    } else {
        request({
            url: 'https://api.github.com/search/repositories',
            qs: {
                q: query
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
            }
        }, function (err, response, body) {
            if (err) { console.log(err); return; }
            res.json(JSON.parse(response.body));
        });
    }
});

/**
 *  * /:
 *   post:
 *     summary: bookmark a repository by id
 *   parameters:
 * @param {id} get repository of that particular id
 * @param {user} user who will bookmark the repository
 * @returns 
 *    response:
 *         description: bookmark a repository by id
 */

app.post('/bookmarkById', (req, res) => {
    var id  = req.body.id;
    var user = req.body.user;
    var url = 'https://api.github.com/repositories/' + id + '';

    request({
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
        }
    }, function (err, response, body) {
        if (err) { console.log(err); return; }
        if (userData[user] == null) {
            userData[user] = [];
        }
        if (userData[user].filter(function(item) {
            return item.id == id;
        }).length == 0 ) {
            userData[user].push(JSON.parse(response.body));
        }
        res.end('Bookmark saved!');
    });
});

/**
 *  * /:
 *   get:
 *     summary: get all the bookmarked repositories
 *   parameters:
 * @param {user}
 * @returns 
 *    response:
 *         description: get all the bookmarked repositories
 */
app.get('/bookmarks',(req,res) => {
    var user = req.query.user;
    if (user == null) {
        res.end('No user specified!');
    } else {
        var results = {user: user, bookmarks : []};
        if (userData[user] != null) {
            results.bookmarks = userData[user];
        }
        res.json(results);
    }
});


/**
 *  * /:
 *   delete:
 *     summary: delete bookmark by Id
 *   parameters:
 * @param {id}
 * @param {user}
 * @returns 
 *    response:
 *         description: remove bookmark by Id
 */
app.delete('/deleteById', (req, res) => {
    var id  = req.body.id;
    var user = req.body.user;
    if (userData[user] == null) {
        res.end("User data not found!");
        return;
    } else {
        var bookmark_ids = userData[user].map((item) => { return item.id });
        if (bookmark_ids.indexOf(id) > -1){
            var bookmarks = userData[user];
            bookmarks.splice(bookmark_ids.indexOf(id),1);
            userData[user] = bookmarks;
            res.end('Bookmark deleted');
        } else {
            res.end('Bookmark not found for user');        
        }
    }
});
