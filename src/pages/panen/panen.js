import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { apiGet } from '../../data/api';
import { useAtom } from 'jotai';
import { Header } from '../../components/header';

export const Panen = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${urlGet}datapanen`)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setData(response);
			});
	}, []);

	return (
		<>
			<Header />
			<div className='container card p-4 mt-3'>
				<h4>Data panen</h4>
				<div className='card-body shadow bg-white rounded'>
					<Table striped bordered hover className='text-center'>
						<thead>
							<tr>
								<th className='align-middle'>ID Panen</th>
								<th className='align-middle'>Berat</th>
								<th className='align-middle'>Tanggal panen</th>
								<th className='align-middle'>Pengelola</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.length > 0 ? (
								<>
									{data.map(item => {
										return (
											<tr key={item.id_panen}>
												<td className='align-middle'>{item.id_panen}</td>
												<td className='align-middle'>{item.berat} kg</td>
												<td className='align-middle'>{item.tanggal_panen}</td>
												<td className='align-middle'>{item.nama_pengguna}</td>
												<td className='align-middle'>
													<button className='btn btn-warning'>Detail</button>
												</td>
											</tr>
										);
									})}
								</>
							) : (
								<>
									<h3>Loading...</h3>
								</>
							)}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
};
