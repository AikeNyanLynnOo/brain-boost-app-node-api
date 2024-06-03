"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTokenByValue = exports.deleteTokenById = exports.createToken = exports.findToken = exports.getTokenById = exports.getTokens = void 0;
const Model_1 = require("./Model");
// READ
const getTokens = async () => Model_1.TokenModel.find();
exports.getTokens = getTokens;
const getTokenById = async (id) => Model_1.TokenModel.findById(id);
exports.getTokenById = getTokenById;
const findToken = async (token) => Model_1.TokenModel.findOne({
    refreshToken: token,
});
exports.findToken = findToken;
// CREATE
const createToken = async (tokenValues) => {
    try {
        const token = new Model_1.TokenModel(tokenValues);
        await token.save();
        return token.toObject();
    }
    catch (error) {
        throw new Error(`Unable to create token: ${error.message}`);
    }
};
exports.createToken = createToken;
// DELETE
const deleteTokenById = async (id) => Model_1.TokenModel.findOneAndDelete({
    _id: id,
});
exports.deleteTokenById = deleteTokenById;
const deleteTokenByValue = async (token) => Model_1.TokenModel.findOneAndDelete({
    refreshToken: token,
});
exports.deleteTokenByValue = deleteTokenByValue;
// UPDATE
// Not necessary for now
//# sourceMappingURL=Service.js.map