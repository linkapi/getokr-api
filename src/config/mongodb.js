const port = process.env.MONGO_PORT || 27017;
const connection = process.env.MONGO_HOST || "mongodb://localhost:" + port + "/getokr";

const options = {
    server: {
        poolSize: 5,
        socketOptions: {
            keepAlive: 1
        }
    }
};

module.exports = () => ({
    connection,
    options
});