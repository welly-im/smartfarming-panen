import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Dropdown } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import { Header } from '../../components/header';
import Cookies from 'js-cookie';

export const Penjualan = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);

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
			<div className='container card p-4 mt-3'>
				<div className='card-body shadow bg-white rounded'>
					<h4>Data penjualan</h4>
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
									{data.map(item => {
										return (
											<tr key={item.id_penjualan}>
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
