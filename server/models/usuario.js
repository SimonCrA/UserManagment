const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// let Client = mongoose.model('Client');

let rolesValidos = {
    values: ['SUPER_ROLE', 'ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE}, is no a valid role'
};

let validDepartments = {
    values: ['sales', 'tech', 'maintaing', 'service'],
    message: '{VALUE}, is not a valid deparment'
};

let Schema = mongoose.Schema;


let userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is needed']
        },
        surname: {
            type: String,
            required: [true, 'surname is needed']
        },
        email: {
            type: String,
            required: [true, 'email is needed'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is needed']
        },
        role: {
            type: String,
            default: 'USER_ROLE',
            enum: rolesValidos
        },
        signUpDate:{
            type: Date,
            default: Date.now()
        },
        img: {
            type: String,
            required: false
        },
        state: {
            type: Boolean,
            default: true
        },
        department: {
            type: String,
            required: false,
            enum: validDepartments
        },
        client: [{ type: Schema.Types.ObjectId, ref: 'Client', required: true }]

});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = mongoose.model('User', userSchema);