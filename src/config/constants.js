const WEB = process.env.MONGO_ADDR || 'http://localhost:3000';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'sendGridApi';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contato@empresa.com"
const AWS_CONFIG = {
    accessKeyId: process.env.ACCESS_KEY_ID || 'acessKey',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || 'secretAcessKey',
    region: 'us-east-1'
}

module.exports = {
    WEB,
    SENDGRID_API_KEY,
    CONTACT_EMAIL,
    AWS_CONFIG
};