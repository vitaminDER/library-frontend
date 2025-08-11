import Cookies from 'js-cookie';

export const setTokenInCookie = (token:string) => {
    Cookies.set('token', token, { expires: 1 ,secure: true, sameSite: 'strict'})}

export const getTokenFromCookie = () => {
    return Cookies.get('token');
};