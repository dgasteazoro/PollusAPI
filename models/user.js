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
        // Navigation properties
        groups: [{
            type: Schema.Types.ObjectId, ref: 'group'
        }],
        org: {
            type: Schema.Types.ObjectId, ref: 'org'
        }
    },
    { timestamps: true }
);

// Menos usuarios y m,as grupos => 25 * 5 125
// Mas grupos y menos usuarios => 10000 * 100 =>  (1) * 100 = 100
// 25 -> [n cantidad de grupos]
// 100 -> [n cantidad de miembros]

// Encrypt password with bcrypt
// Hook -> Fn que se ancla al comportamiento o llamada de otra

// Crear un usuario -> contra normal -> contra hasheada
// Actualizar un usuario -> contra hasheada -> aplicar hash
// Always encrypt the password before save
UserSchema.pre("save", async function (next) {
    const user = this;
    // Auto-generate Salt, and 10 salt rounds
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

UserSchema.methods.addGroup = async function (groupId) {
    const user = this;

    const isMember = user.groups.some((it) => it === groupId);

    if (isMember)
        return null;

    user.groups.push(groupId);
    
    return user.groups;
}

UserSchema.methods.removeGroup = async function (groupId) {
    const user = this;

    const isMember = user.groups.some((it) => it === groupId);

    if (!isMember)
        return false;

    user.groups = user.groups.filter((it) => it !== groupId);
    
    return true;
}

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;