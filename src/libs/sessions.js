import URLS from './urls';
import Storage from './storage';

class UserSession {
    static instance = new UserSession()

    login = async body => {
        try {
            let request = await fetch(`${URLS.django_app}/auth/login`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Accept:'application/json',
                },
                body: JSON.stringify(body),
            });
            let response = await request.json();
            try {
                let key = 'user-token';
                let adminkey = 'user-data'
                await Storage.instance.store(key, JSON.stringify(response.token));
                await Storage.instance.store(adminkey, JSON.stringify(response.user));
                return true;
            } catch (error) {
                return response
            }
        } catch (error) {
            var body2 = JSON.stringify(body)
            console.log(body2)
            throw Error(error)
        }
    }

    signup = async body => {
        try {
            let request = await fetch(`${URLS.django_app}/auth/register`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Accept:'application/json',
                },
                body: JSON.stringify(body),
            });
            let response = await request.json();
            if (typeof response.username === 'string') {
                return response.username
            } else {
            return response
            }
        } catch (error) {
            console.log('signup error', error)
            throw Error(error)

        }
    }

    logout = async token => {
        try {
            let request = await fetch(`${URLS.django_app}/auth/logout`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Accept:'application/json',
                    Authorization:`Token ${token}`
                }
            });

            let response = await request.json()
            try {
                let tokenKey = 'user-token';
                let userKey = 'user-data';
                await Storage.instance.remove(tokenKey);
                await Storage.instance.remove(userKey);
            } catch (error) {
                throw Error(error)
            }
            return response
        } catch (error){
            console.log('Logout error', error)
        }
    }

    
}

export default UserSession