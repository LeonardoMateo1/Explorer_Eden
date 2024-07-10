const { Schema, mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    currency: {
        type: String
    },
    trips: [{
            type: Schema.Types.ObjectId,
            ref: 'Trip'
        }]
    
}, {timestamps: true});

userSchema.path('email').validate(async(value) => {
    const emailCount = await mongoose.models.User.countDocuments({email: value});
    return !emailCount;
}, 'Email already exists');

userSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => {
        this._confirmPassword = value;
    });

userSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

userSchema.virtual('confirmEmail')
    .get(function() {
        return this._confirmEmail;
    })
    .set(function(value) {
        this._confirmEmail = value;
    });

userSchema.pre('validate', function(next) {
    if (this.email !== this.confirmEmail) {
        this.invalidate('confirmEmail', 'Emails must match');
    }
    next();
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model("User", userSchema)