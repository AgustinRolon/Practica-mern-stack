const app = require('./app');
require('./database');

async function main(){
    await app.listen(process.env.PORT || 4000);
    console.log("Server on port: 4000")
}

main();
