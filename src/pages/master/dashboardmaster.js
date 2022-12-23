import { Tabs, Tab } from 'react-bootstrap';
import { Header } from '../../components/header';
import { MasterGrade } from './mastergrade';
import { MasterPembeli } from './masterpembeli';
import { MasterPengguna } from './masterpengguna';
import { MasterCuaca } from './mastercuaca';
export const DashboardMaster = () => {
	return (
		<>
			<Header />
			<div className='card p-3 mt-1 mx-3'>
				<div className='card-body shadow bg-white rounded'>
					<h4>Master Data</h4>
					<Tabs
						defaultActiveKey='Pengguna'
						transition={true}
						id='noanim-tab-example'
						className='mb-3'>
						<Tab eventKey='Pengguna' title='Master Data Pengguna'>
							<MasterPengguna />
						</Tab>
						<Tab eventKey='Pembeli' title='Master Data Pembeli'>
							<MasterPembeli />
						</Tab>
						<Tab eventKey='Grade' title='Master Data Grade'>
							<MasterGrade />
						</Tab>
						<Tab eventKey='Cuaca' title='Master Data Cuaca'>
							<MasterCuaca />
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};
