//import buffer from 'buffer';
import { Encoding } from 'NativeModules';
import { AsyncStorage } from 'react-native';

import _ from 'lodash';

const auth = 'auth';
const user = 'user';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([auth, user], (err, val) => {
            if (err){
                return cb(err);
            }
            if (!val) {
                return cb();
            }
            const zippedObj = _.zipObject(val);
            if (!zippedObj[auth]){
                return cb();
            }

            const authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObj[auth]
                },
                user: JSON.parse(zippedObj[user])
            }
            return cb(null, authInfo);
        });
    }
    login(creds, cb){
        const authstr = creds.username +
            ':' + creds.password;
        Encoding.base64Encode(authstr, encodeAuth => {
            fetch('https://api.gitpub.com/user', {
                headers: {
                    'Authorization': 'Basic ' + encodeAuth 
                }
            })
            .then(response => {
                if (response.status >= 200 & response.status < 300)
                    return response;

                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            })
            .then(response => {
                response.json();
            })
            .then(result => {
                AsyncStorage.multiSet([
                    [auth, encodeAuth],
                    [user, JSON.stringify(result)]
                ], (err) => {
                    if (err) throw err;
                });
                return cb({success: true});
            })
            .catch(err => { return cb(err) });
            });
            //const encodeAuth = b.toString('base64');
        
    }
}

module.exports = new AuthService();