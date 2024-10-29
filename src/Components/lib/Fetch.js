import {server} from './server';


const Post = async (url, data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`${server}${url}`, requestOptions);
    const result = await response.json();
    return result;
}

const Get = async (url, token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${server}${url}`, requestOptions);
    const result = await response.json();
    return result;
}

export { Post, Get };