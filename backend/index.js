const Koa = require("koa");
const app = new Koa();

// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get("X-Response-Time");
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

//response
app.use(async ctx => {
	ctx.body = "Hello World";
});


//TODO Read below
/*Error Handling

By default outputs all errors to stderr unless app.silent is true. The default error handler also won't output errors when err.status is 404 or err.expose is true. To perform custom error-handling logic such as centralized logging you can add an "error" event listener:

app.on('error', err => {
  log.error('server error', err)
});

If an error is in the req/res cycle and it is not possible to respond to the client, the Context instance is also passed:

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

When an error occurs and it is still possible to respond to the client, aka no data has been written to the socket, Koa will respond appropriately with a 500 "Internal Server Error". In either case an app-level "error" is emitted for logging purposes.*/

app.on("error", (err, ctx) => {
	log.error("Server Error", err);
});

app.listen(3000);