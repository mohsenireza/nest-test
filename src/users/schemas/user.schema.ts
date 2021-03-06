import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: {
        type: Array,
        default: ['student']
    }
});