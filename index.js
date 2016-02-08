const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', function (ctx, next) {
  const ping = app.context.ping || 'never';
  ctx.body = 'Last ping: ' + ping;
});

router.get('/ping', function (ctx, next) {
  const now = new Date();
  ctx.body = now;
  app.context.ping = now;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
