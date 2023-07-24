import * as crypto from 'crypto';

const SECRET = "64b77fdade99b4650666c54d";
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) =>{
    return crypto.createHmac('sha256', [salt, password].join("/")).update(SECRET).digest('hex');
};
