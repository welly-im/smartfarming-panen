import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../../data/api';
import { useAtom } from 'jotai';

export const FermentasiBagus = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);

	useEffect(() => {}, []);

	return (
		<>
			<h1>fermentasi bagus</h1>
		</>
	);
};
