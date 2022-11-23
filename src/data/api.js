import { atom } from 'jotai';

export const apiPost = atom('http://192.168.0.105/server-ta/web/');
export const apiGet = atom('http://192.168.0.105/server-ta/?smartfarming=');

export const apiPost1 = atom('https://sismartfarming.000webhostapp.com/web/');
export const apiGet1 = atom(
	'https://sismartfarming.000webhostapp.com/?smartfarming='
);
