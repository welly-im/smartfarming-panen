import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../../data/api';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';

export const PenjemuranJelek = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);

	useEffect(() => {}, []);

	return (
		<>
			<h1>penjemuran jelek</h1>
		</>
	);
};
