import React from 'react';

class Storage {
    static instance = new Storage();

    store = async (key, value) => {
        try {
            await sessionStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.log('store error in class Storage', error);
            return false;
        }
    }

    get = async key => {
        try {
            return await sessionStorage.getItem(key);
        } catch (error) {
            console.log('get error in class Storage', error);
            throw Error(error);
        }
    }

    remove = async key => {
        try {
            await sessionStorage.removeItem(key);
            return true
        } catch (error) {
            console.log('remove error in class Storage', error);
            throw Error(error)
        }
    }
}

export default Storage