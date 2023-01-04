import { useEffect, useState } from 'react';
import {
	Button,
	Table,
	Modal,
	Form,
	Dropdown,
	InputGroup,
} from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import { Header } from '../../components/header';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';

export const Penjualan = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [filterDate, setFilterDate] = useState({
		startDate: '',
		endDate: '',
	});

	useEffect(() => {
		fetch(`${urlGet}getdatakopiterjual`)
			.then(response => response.json())
			.then(response => {
				setData(response.data);
			});
	}, []);

	return (
		<>
			<Header />
			<div className='card p-2 mt-3 mx-3'>
				<div className=' d-flex px-3'>
					<div className='card-body shadow bg-white rounded w-50'>
						<BarChart />
					</div>
					<hr className=' mx-1' />
					<div className='card-body shadow bg-white rounded w-50'>
						<LineChart />
					</div>
				</div>
				<div className='card-body shadow bg-white rounded mt-4'>
					<h4>Data penjualan</h4>
					<div className='d-flex w-50'>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1'>
								Tanggal penjualan
							</InputGroup.Text>
							<InputGroup.Text id='basic-addon1'>dari</InputGroup.Text>
							<Form.Control
								aria-label='Text input with dropdown button'
								type='date'
								onChange={e =>
									setFilterDate({
										...filterDate,
										startDate: e.target.value,
									})
								}
							/>
							<InputGroup.Text id='basic-addon1'>sampai</InputGroup.Text>
							<Form.Control
								aria-label='Text input with dropdown button'
								type='date'
								onChange={e => {
									setFilterDate({
										...filterDate,
										endDate: e.target.value,
									});
									console.log(filterDate, data);
								}}
							/>
						</InputGroup>
					</div>
					<div
						style={{
							overflowY: 'scroll',
							width: '100%',
							maxHeight: '350px',
							marginBottom: '1%',
						}}>
						{data !== null && data.length > 0 ? (
							<Table striped bordered hover className='text-center'>
								<thead>
									<tr>
										<th className='align-middle'>ID Stok</th>
										<th className='align-middle'>ID Penjualan</th>
										<th className='align-middle'>Berat</th>
										<th className='align-middle'>Tanggal penjualan</th>
										<th className='align-middle'>Harga penjualan</th>
										<th className='align-middle'>Harga per kg</th>
										<th className='align-middle'>Nama pembeli</th>
										<th className='align-middle'>Grade</th>
										<th className='align-middle'>Pengelola</th>
									</tr>
								</thead>
								<tbody>
									{data
										.filter(item => {
											let date = item.tgljual;
											let startDate = filterDate.startDate;
											let endDate = filterDate.endDate;
											console.log(
												item.tgljual,
												filterDate.startDate,
												filterDate.endDate
											);
											if (
												filterDate.startDate !== '' ||
												filterDate.endDate !== ''
											)
												return date >= startDate && date <= endDate;
											if (
												filterDate.startDate !== '' ||
												filterDate.endDate !== ''
											)
												return date >= startDate && date <= endDate;
											if (
												filterDate.startDate === '' ||
												filterDate.endDate === ''
											)
												return item;
											return null;
										})
										.map(item => {
											return (
												<tr key={item.id_penjualan}>
													<td className='align-middle'>{item.id_stok}</td>
													<td className='align-middle'>{item.id_penjualan}</td>
													<td className='align-middle'>{item.berat_kopi} Kg</td>
													<td className='align-middle'>
														{item.tanggal_penjualan}
													</td>
													<td className='align-middle'>
														{new Intl.NumberFormat('id-ID', {
															style: 'currency',
															currency: 'IDR',
														}).format(item.harga_penjualan)}
													</td>
													<td className='align-middle'>
														{new Intl.NumberFormat('id-ID', {
															style: 'currency',
															currency: 'IDR',
														}).format(item.harga_penjualan / item.berat_kopi)}
													</td>
													<td className='align-middle'>{item.nama_pembeli}</td>
													<td className='align-middle'>{item.grade}</td>
													<td className='align-middle'>{item.nama_pengguna}</td>
												</tr>
											);
										})}
								</tbody>
							</Table>
						) : (
							<>
								<h3 className='mt-3 w-100'>
									Tidak ada data penjualan yang tersedia . . .
								</h3>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
