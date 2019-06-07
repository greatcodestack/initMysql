const mysql = require('mysql2');
const Promise = require('bluebird');
var fs = require('fs');
var path   = require('path');
var _   = require('lodash');

const yars = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('init', '初始化数据库', {
    dbpassword: {
      alias: 'dbpassword',
      type: 'string'
    }
  })
  .command('upgrade', '升级数据库', {
    dbpassword: {
      alias: 'dbpassword',
      type: 'string'
    }
  })

  .default({dbname: 'users', dbhost: '127.0.0.1', dbuser: 'root', dbpassword: '123...lll'})
  .help('h')
  .alias('h', 'help')

const argv = yars.argv;
const command = argv._[0];
var dbname = argv.dbname ? argv.dbname : 'users';
var dbhost = argv.dbhost ? argv.dbhost : 'localhost';
var dbuser = argv.dbuser ? argv.dbuser : 'root';
var dbport = argv.dbport ? argv.dbport : 3306;
var dbpassword = argv.dbpassword;

if (command === 'init') {
  var connection2;
  var connection = mysql.createConnection({
      host: dbhost,
      user: dbuser,
      password: dbpassword,
      port: dbport
  });
  var createDatabaseSql = argv.force ? `CREATE DATABASE IF NOT EXISTS ${dbname}` :
      `CREATE DATABASE ${dbname}`;
  Promise.promisifyAll(connection);
  connection.connect();
  connection.queryAsync(createDatabaseSql)
  .then(function(){
      connection2 = mysql.createConnection({
          host: dbhost,
          user: dbuser,
          password: dbpassword,
          database: dbname,
          multipleStatements: true,
          port: dbport
      });
      connection2.connect();
      Promise.promisifyAll(connection2);
      return connection2;
  })
  .then(function(connection2){
      var sql = fs.readFileSync(path.resolve(__dirname, '../sql/users-0.1.sql'), 'utf-8');
      return connection2.queryAsync(sql);
  })
  .then(function(){
      console.log('success.');
  })
  .catch(function(e){
      console.log(e);
  })
  .finally(function(){
      if(connection) connection.end();
      if(connection2) connection2.end()
  });
}
