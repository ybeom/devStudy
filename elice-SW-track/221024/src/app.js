const http = require("http");
const express = require("express");
const loader = require("./loader");
const config = require("./config");
const AppError = require("./misc/AppError");
const commonErrors = require("./misc/commonErrors");

const apiRouter = require("./router");

const createApp = async () => {
    await loader.connectMongoDB();

    console.log("express app을 초기화합니다.");
    const expressApp = express();

    expressApp.use(express.json());

    expressApp.use("/api/v1", apiRouter.v1);

    expressApp.use((err, req, res, next) => {
        console.log(err);
        res.statusCode = err.httpCode ?? 500;
        res.json({
            data: null,
            error: err.message,
        });
    });
    console.log("express app 준비가 완료되었습니다.");

    const server = http.createServer(expressApp);
    const app = {
        async start() {
            server.listen(config.port);
            server.on("listening", () => {
                console.log(`서버가 ${config.port}에서 운영중입니다.`);
            });
        },
        async stop() {
            console.log("🔥 서버를 중지 작업을 시작합니다.");
            this.isShuttingDown = true;
            return new Promise((resolve, reject) => {
                server.close(async (error) => {
                    if (error !== undefined) {
                        console.log(`- HTTP 서버 중지를 실패하였습니다: ${error.message}`);
                        reject(error);
                    }
                    console.log("- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.");
                    await loader.disconnectMongoDB();
                    console.log("- DB 커넥션을 정상적으로 끊었습니다.");
                    console.log("🟢 서버 중지 작업을 성공적으로 마쳤습니다.");
                    this.isShuttingDown = false;
                    resolve();
                });
            });
        },
        isShuttingDown: false,
        _app: expressApp,
    };

    return app;
};

module.exports = createApp;
