import { Tabs, Tab } from 'react-bootstrap';
import { Header } from '../../components/header';
import { PengolahanBagus } from './pengolahanbagus';
import { PengolahanJelek } from './pengolahanjelek';

export const Pengolahan = () => {
	return (
		<>
			<Header />
			<div className='card p-1 mt-1 mx-3'>
				<div className='card-body shadow bg-white rounded'>
					<h4>Data pengolahan</h4>
					<Tabs
						defaultActiveKey='Bagus'
						transition={true}
						id='noanim-tab-example'
						className='mb-3'>
						<Tab eventKey='Bagus' title='Data Sortingan Premium'>
							<PengolahanBagus />
						</Tab>
						<Tab eventKey='Jelek' title='Data Sortingan Standard'>
							<PengolahanJelek />
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};
