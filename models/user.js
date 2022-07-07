const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: { 
            type: String,
            enum: ["admin", "org", "user"],
            default: "user"
        },
        groups: {
            type: Array
        }
    },
    { timestamps: true }
);

// Encrypt password with bcrypt
UserSchema.pre("save", async function (next) {
    const user = this;
    // Auto-generate Salt and 10 salt rounds
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

// Helper method to validate password
UserSchema.methods.isValidPassword = async function (password) {
const user = this;
const compare = await bcrypt.compare(password, user.password);
return compare;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;