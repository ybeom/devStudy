const createApp = require("../src/app");

async function main() {
    const app = await createApp();
    process.on("uncaughtException", (err) => {
        console.log(`uncaughtException: ${err}`);
    });

    for (const signal of ["SIGTERM", "SIGHUP", "SIGINT", "SIGUSR2"]) {
        process.on(signal, async () => {
            if (!app.isShuttingDown) {
                console.log(`시스템 시그널, ${signal}을 수신하였습니다. 의도된 서버 중지 신호입니다.  Graceful shutdown을 실시합니다.`);
            }
            await app.stop();
            console.log(`Graceful shutdown이 완료되었습니다.`);
            console.log(`바이바이 👋`);
            process.exit(0);
        });
    }

    await app.start();
}

main();
