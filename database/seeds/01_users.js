
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'cory',
          password:'cory',
          email:'cory@email.com'
        },
        {
          id: 2,
          username: 'robert',
          password:'robert',
          email:'robert@email.com'
        },
        {
          id: 3,
          username: 'eian',
          password:'eian',
          email:'eian@email.com'
        },
        {
          id: 4,
          username: 'asher',
          password:'asher',
          email:'asher@email.com'
        },
        {
          id: 5,
          username: 'thomas',
          password:'thomas',
          email:'thomas@email.com'
        },
        {
          id: 6,
          username: 'xuhui',
          password:'xuhui',
          email:'xuhui@email.com'
        },
        {
          id: 7,
          username: 'percival',
          password:'percival',
          email:'percival@email.com'
        },
        {
          id: 8,
          username: 'claudia',
          password:'claudia',
          email:'claudia@email.com'
        },
        {
          id: 9,
          username: 'todd',
          password:'todd',
          email:'todd@email.com'
        },
        {
          id: 10,
          username: 'ramirez',
          password:'ramirez',
          email:'ramirez@email.com'
        },
        {
          id: 11,
          username: 'artin',
          password:'artin',
          email:'artin@email.com'
        },
        {
          id: 12,
          username: 'brian',
          password:'brian',
          email:'briian@email.com'
        },          
      ]);
    });
};
