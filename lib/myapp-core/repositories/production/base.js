import Knex from 'knex';
import Bookshelf from 'bookshelf';
import modelBase from 'bookshelf-modelbase';

export default function (config) {
    let knex = Knex( config );
    let bookshelf = Bookshelf( knex );

    //bookshelf.plugin('virtuals');
    bookshelf.plugin([
        'visibility',
        'bookshelf-camelcase',
        'bookshelf-jsonapi-params'
    ],
    {
        pagination: { limit: 10 }
    });

    bookshelf.plugin(modelBase.pluggable);

    return {
        Model : bookshelf.Model,
        Collection : bookshelf.Collection
    };
}
