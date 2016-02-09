'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

app.context.ping = 'never';
app.context.online = {};

router.get('/', function (ctx, next) {
  ctx.body = 'Last ping: ' + app.context.ping;
});

router.get('/ping', function (ctx, next) {
  const now = new Date();
  ctx.body = now;
  ctx.app.context.ping = now;
});

router.get('/online', function (ctx, next) {
  ctx.body = {};
  const online = ctx.app.context.online;
  for (const hostname in online) {
    const lastUpdate = online[hostname];
    const diff = new Date() - lastUpdate;
    let status = 'offline';
    if (diff < 60 * 1000) {
      status = 'online';
    }
    ctx.body[hostname] = status;
  }
});

router.put('/online/:hostname', function (ctx, next) {
  const hostname = ctx.params.hostname;
  ctx.app.context.online[hostname] = new Date();
  ctx.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
