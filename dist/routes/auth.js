"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
exports.default = (router) => {
    router.post("/auth/login", auth_1.login);
    router.post("/auth/register", auth_1.register);
    router.post("/auth/logout", auth_1.logout);
    router.post("/auth/token", auth_1.refreshToken);
};
//# sourceMappingURL=auth.js.map