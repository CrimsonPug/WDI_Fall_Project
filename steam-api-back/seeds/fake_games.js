
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({
          name: 'Overwatch',
          img: 'http://www.gamestop.com/gs/images/bonus/overwatchposter_bonusLG.jpg',
          desc: 'its a game',
          release: 'May 23, 2016',
          platform: 'PC'
        }),
        knex('games').insert({
          name: 'Counter Strike:Global Offensive',
          img: 'http://ecx.images-amazon.com/images/I/81L8-mjNlrL._SL1500_.jpg',
          desc: 'just another game',
          release: 'August 21, 2012',
          platform: 'PC'
        }),
        knex('games').insert({
          name: 'League of Legends',
          img: 'http://i.imgur.com/nIOUjVM.png',
          desc: 'an angry game',
          release: 'October 27, 2009',
          platform: 'PC'
        })
      ]);
    });
};
