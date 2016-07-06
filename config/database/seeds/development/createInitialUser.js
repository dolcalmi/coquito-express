
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
    .then(function () {
        return Promise.all([
            knex('users').insert({
                "first_name": "john",
                "last_name" : "Doe",
                "email":"john.doe@gmail.com",
                "password":"$2a$10$QY/i88Ep3NxD7qwh.lnbDueqDgT0bTv3Zs55LbzrOXjkHDLMZ3YZC",
                "email_verified" : true,
                "email_verified_at" : new Date(),
                "last_login_at" : new Date()
            })
        ]);
    });
};
