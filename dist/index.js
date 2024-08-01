"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const app_config_1 = require("./configs/app.config");
const app = express();
app.use('/', routes_1.router);
app.use((err, _, res, __) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});
app.listen(Number(app_config_1.AppConfig.port), '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${app_config_1.AppConfig.port}`);
});
//# sourceMappingURL=index.js.map