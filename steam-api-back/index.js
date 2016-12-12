const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const PORT = process.env.PORT || 8888;
const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'games',
        charset: 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);

const authorize = require('./middleware/authorize');

app.use(express.static(__dirname + './../steam-api-front/build'))

const APIKEY = 'fc08231b5b235630ae9b475fe7d311f8d0a960a7';

const Game = bookshelf.Model.extend({
    tableName: 'games',
    skill: function () {
        return this.belongsToMany(Skill);
    }
});

const User = bookshelf.Model.extend({
    tableName: 'users',
    game: function () {
        return this.hasMany(Game);
    }
});

const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    comment: function () {
        return this.belongsTo(User);
    }
});

const Skill = bookshelf.Model.extend({
    tableName: 'skills',
    user: function () {
        return this.belongsToMany(User, 'user_id');
    },
    game: function () {
        return this.hasMany(Game, 'game_id');
    }
})

app.use(bodyParser.json());

let options = {
    url: 'http://www.giantbomb.com/api/search/?api_key=' + APIKEY + '&format=json&query="warcraft"&limit=9&resources=game&field_list=aliases,deck,image,name,original_game_rating,original_release_date,platforms',
    headers: {
        'User-Agent': 'frshocksSuperBot'
    }
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});

app.post('/account', authorize, (req, res) => {
    let username = req.body.username;
    if (username === req.decoded.username) {
        User.where({ username: username }).fetch().then(user => {
            res.send(user);
        })
    }
    else (
        res.status(404).json({ success: false, message: 'CMON BRO WHAT YOU TRYIN?' }),
        console.log('hah you dummie')
    )
})

app.post('/userProfile', (req, res) => {
    let recipient = req.body.userId;
    let username = req.body.username;
    let profileInfo = [];
    User.where({ username: username }).fetch().then(user => {
        Comment.where({ recipient_id: user.attributes.id }).fetchAll().then((comment) => {
            for (let i = 0; i < comment.models.length; i++) {
                profileInfo.push(comment.models[i].attributes);
            }
        })
        setTimeout(() => { res.send({ user: user, profileInfo: profileInfo }) }, 250);
        setTimeout(() => { console.log(profileInfo)}, 250);
    })
})

app.get('/search/:search', (req, res) => {
    let searchOptions = {
        url: 'http://www.giantbomb.com/api/search/?api_key=' + APIKEY + '&format=json&query=' + req.params.search + '&resources=game&field_list=aliases,deck,image,name,original_game_rating,original_release_date,platforms',
        headers: {
            'User-Agent': 'frshocksSuperBot'
        }
    }
    request(searchOptions, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            let parsedReq = JSON.parse(body);
            let reqArray = [];
            for (let i = 0; i < parsedReq.results.length; i++) {
                if (parsedReq.results[i].image != undefined && parsedReq.results[i].image != null && parsedReq.results[i].image.medium_url != undefined && parsedReq.results[i].image.medium_url != null && parsedReq.results[i].platforms != null) {
                    for (let j = 0; j < parsedReq.results[i].platforms.length; j++) {
                        if (parsedReq.results[i].platforms[j].name === "PC") {
                            reqArray.push({
                                desc: parsedReq.results[i].deck,
                                name: parsedReq.results[i].name.toUpperCase(),
                                img: parsedReq.results[i].image.medium_url,
                                platform: parsedReq.results[i].platforms[j].name,
                                release: parsedReq.results[i].original_release_date,
                                review: parsedReq.results[i].original_game_rating
                            })
                            new Game().save({ gameName: parsedReq.results[i].name.toUpperCase(), posterImage: parsedReq.results[i].image.medium_url, gameDescription: parsedReq.results[i].deck, releaseDate: parsedReq.results[i].original_release_date, platform: parsedReq.results[i].platforms[j].name }).catch(err);
                        }
                    }
                }
                else {
                    console.log('lol oh well');
                }
            }
            res.json(reqArray);
        }
        else {
            console.log(err);
        }
    })
})

app.get('/game/:game', (req, res) => {
    const userList = [];
    Game.where({ gameName: req.params.game }).fetch().then((game => {
        Skill.where({ game_id: game.attributes.id }).fetchAll().then((skill) => {
            // console.log(skill.models);
            for (let i = 0; i < skill.models.length; i++) {
                User.where({ id: skill.models[i].attributes.user_id }).fetch().then((user) => {
                    userList.push(user.attributes, skill.models[i].attributes.skillLevel);
                })
            }
        })
    })).catch(function () {
        res.status(404).send('Unable to find users.');
    });
    setTimeout(() => { res.send(userList) }, 1000);
})

app.get('/specificUser/:userName', (req, res) => {
    User.where({ username: req.params.userName }).fetch().then((user) => {
        console.log(user);
        res.send(user);
    })
})

app.post('/addGame', (req, res) => {
    let gameName = req.body.gameName;
    let userId = req.body.userId;
    let skillLevel = req.body.skillLevel;
    Game.where({ gameName: gameName.toUpperCase() }).fetch().then((data) => {
        Skill.where({ game_id: data.attributes.id, user_id: userId }).fetch().then((skill) => {
            if (skill === null || skill === undefined) {
                new Skill().save({ user_id: userId, game_id: data.id, skillLevel: skillLevel });
            }
            else {
                res.status(404).send('dude, stop trying to save the same thing.');
            }
        })

    })
});

app.put('/editComment/', (req, res) => {
    console.log(req.body);
    let updatedComment = {comment: req.body.modalComment};
    Comment.where({ id: req.body.currentComment }).save(updatedComment, { patch: true }).then((comment) => {
        console.log(comment);
    }).catch(e => {
        res.status(500).send(e);
    })
})

app.delete('/deleteComment/:commentId,:loggedIn', (req, res) => {
    Comment.where({ id: req.params.commentId }).fetch().then((comment) => {
        if (req.params.loggedIn === comment.attributes.sender_id) {
            comment.destroy();
            console.log('Comment destroyed.');
        }
        else {
            console.log('User doesn\'t have access to deleting this comment!');
        }
    }).catch(e => {
        res.status(500).send(e);
    });
})

app.delete('/deleteUser/:username', (req, res) => {
    User.where({username: req.params.username}).destroy();
    console.log('User deleted.');
})

app.post('/leaveComment', (req, res) => {
    let recipient = req.body.userId;
    let sender = req.body.onPage;
    let comment = req.body.comment;
    let profileInfo = [];
    new Comment({ sender_id: sender, recipient_id: recipient, comment: comment }).save();
    User.where({ id: req.body.userId }).fetch().then(user => {
        Comment.where({ recipient_id: req.body.userId }).fetchAll().then((comment) => {
            for (let i = 0; i < comment.models.length; i++) {
                profileInfo.push(comment.models[i].attributes);
            }
        })
        setTimeout(() => { res.send({ user: user, profileInfo: profileInfo }) }, 250);
    }).catch(e => {
        res.status(500).send(e);
    })
})


// USER ACCOUNT CREATION + ENCRYPTION
app.post('/encrypt', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.userbio;
    let age = req.body.age;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => { 
            if (err) console.log(err);
            console.log('new user saved');
            new User().save({ username: username, password: hash, userBio: bio, age: age }).catch(function () {
                res.status(404).send('Unable to register user');
            });

        });
    }).catch(e => {
        res.status(500).send(e);
    });
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.where({ username: username }).fetch().then((data) => {
        bcrypt.compare(password, data.attributes.password.toString(), function (err, result) {
            if (result) {
                let token = jwt.sign({ username: username }, 'brainstationkey');
                res.json({ token: token, username: username });
            }
            else {
                res
                    .status(403)
                    .send({ token: null });
            }
        });
    })
});

app.get('*', function(req, res) {
    res.sendFile(path.resolve((__dirname+'./../steam-api-front/build/index.html')));
});

app.listen(PORT, () => {
    console.log('Server running on:' + PORT);
    console.log('Kill server with CTRL + C');
});