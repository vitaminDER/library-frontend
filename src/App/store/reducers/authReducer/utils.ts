import Cookies from 'js-cookie';

export const setTokenInCookie = (token:string) => {
    Cookies.set('auth_token', token, { expires: 1 });
};

export const getTokenFromCookie = () => {
    return Cookies.get('auth_token');
};