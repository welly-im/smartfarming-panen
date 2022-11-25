import { useEffect, useState } from 'react';
import { Tabs, Tab, Table, Button, Form, Modal } from 'react-bootstrap';
import { Header } from '../../components/header';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { FermentasiJelek } from './jelek/fermentasijelek';
import { PenjemuranJelek } from './jelek/penjemuranjelek';

export const PengolahanJelek = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);

	useEffect(() => {}, []);

	return (
		<>
			<Header />
			<div className='container card p-4 mt-3'>
				<div className='card-body shadow bg-white rounded'>
					<div className='d-flex justify-content-between'>
						<h4>Data pengolahan kopi standard</h4>
					</div>
					<Tabs
						defaultActiveKey='Fermentasi'
						transition={true}
						id='noanim-tab-example'
						className='mb-3'>
						<Tab eventKey='Fermentasi' title='Proses Fermentasi'>
							<FermentasiJelek />
						</Tab>
						<Tab eventKey='Penjemuran' title='Proses Penjemuran'>
							<PenjemuranJelek />
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};
