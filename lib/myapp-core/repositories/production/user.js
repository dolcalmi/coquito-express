import BaseRepo from './base';

export default {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['emailVerified', 'emailVerifiedAt', 'password', 'pendingReset', 'updated_at', 'created_at', 'plainPassword'],

    queries: {

        findVerifiedById ( id, require = true ) {
            return this.findOne({ id : id, emailVerified : true }, { require: require });
        },
        
        findUnverifiedById ( id, require = true ) {
            return this.findOne({ id : id, emailVerified : false }, { require: require });
        },

        findByEmail ( email, require = true ) {
            return this.findOne({ email : email }, { require: require });
        }
    }
};
