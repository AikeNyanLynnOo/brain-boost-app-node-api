import { TokenModel } from "./Model";

// READ
export const getTokens = async () => TokenModel.find();
export const getTokenById = async (id: string) => TokenModel.findById(id);
export const findToken = async (token: string) =>
  TokenModel.findOne({
    refreshToken: token,
  });

// CREATE
export const createToken = async (tokenValues: Record<string, any>) => {
  try {
    const token = new TokenModel(tokenValues);
    await token.save();
    return token.toObject();
  } catch (error) {
    throw new Error(`Unable to create token: ${(error as Error).message}`);
  }
};

// DELETE
export const deleteTokenById = async (id: string) =>
  TokenModel.findOneAndDelete({
    _id: id,
  });

export const deleteTokenByValue = async (token: string) =>
  TokenModel.findOneAndDelete({
    refreshToken: token,
  });

// UPDATE
// Not necessary for now
