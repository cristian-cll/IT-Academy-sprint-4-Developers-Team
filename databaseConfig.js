const mysqlConfig = {
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'taskcli-test',
};

const mongoConfig = {
    host: "localhost",
    port: 27017,
    database: 'taskcli-test',
};


module.exports = {
    mysqlConfig,
    mongoConfig
}