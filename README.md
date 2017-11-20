# hapi-router-cors
make the route-level cors header setting


hapi has its own attribute  cors to set global seting for request header "access-control-allow-origin",
but this plugin is use for set the route-level-cors 

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/Z19BUn1GbyPQSiyrZ26iCHMC/Guocover/hapi-router-cors'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/Z19BUn1GbyPQSiyrZ26iCHMC/Guocover/hapi-router-cors.svg' />
</a>

# use

```javascript
const server = new Hapi.Server();
server.connection({ port: 80 });

// absolute host
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply(200);
    },
    config: {
        cors: {
            origin: ['ke.qq.com']  //multi
        }
    }
});

// releative host
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply(200);
    },
    config: {
        cors: {
            origin: ['qq.com']  //multi
        }
    }
});
```
