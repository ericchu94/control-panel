const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', function (ctx, next) {
  ctx.body = 'Hello Koa';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
