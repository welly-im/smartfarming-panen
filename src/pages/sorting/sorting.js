import { useEffect, useState } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { Header } from '../../components/header';
import { apiGet } from '../../data/api';
import { useAtom } from 'jotai';

export const Sorting = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [dataBagus, setDataBagus] = useState([]);
	const [dataJelek, setDataJelek] = useState([]);

	useEffect(() => {
		fetch(`${urlGet}getdatasortingbagus`)
			.then(response => response.json())
			.then(response => {
				setDataBagus(response.data);
			});
		fetch(`${urlGet}getdatasortingjelek`)
			.then(response => response.json())
			.then(response => {
				setDataJelek(response.data);
			});
	}, []);
	return (
		<>
			<Header />
			<div className='container p-4 mt-3'>
				<div className='card'>
					<div className='card-body shadow bg-white rounded'>
						<h4>Data sortingan kopi</h4>
						<Tabs
							defaultActiveKey='SortingBagus'
							transition={true}
							id='noanim-tab-example'
							className='mb-3'>
							<Tab eventKey='SortingBagus' title='Sortingan Bagus'>
								<Table striped bordered hover className='text-center'>
									<thead>
										<tr>
											<th className='align-middle'>ID Sorting</th>
											<th className='align-middle'>Berat</th>
											<th className='align-middle'>Tanggal sorting</th>
											<th className='align-middle'>Pengelola</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{dataBagus.length > 0 ? (
											<>
												{dataBagus.map(item => {
													return (
														<tr key={item.id_sorting}>
															<td className='align-middle'>
																{item.id_sorting}
															</td>
															<td className='align-middle'>{item.berat} kg</td>
															<td className='align-middle'>
																{item.tanggal_sorting}
															</td>
															<td className='align-middle'>
																{item.nama_pengguna}
															</td>
															<td className='align-middle'>
																<button className='btn btn-warning'>
																	Detail
																</button>
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
							</Tab>
							<Tab eventKey='SortingJelek' title='Sortingan Jelek'>
								<Table striped bordered hover className='text-center'>
									<thead>
										<tr>
											<th className='align-middle'>ID Sorting</th>
											<th className='align-middle'>Berat</th>
											<th className='align-middle'>Tanggal sorting</th>
											<th className='align-middle'>Pengelola</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{dataJelek.length > 0 ? (
											<>
												{dataJelek.map(item => {
													return (
														<tr key={item.id_sorting}>
															<td className='align-middle'>
																{item.id_sorting}
															</td>
															<td className='align-middle'>{item.berat} kg</td>
															<td className='align-middle'>
																{item.tanggal_sorting}
															</td>
															<td className='align-middle'>
																{item.nama_pengguna}
															</td>
															<td className='align-middle'>
																<button className='btn btn-warning'>
																	Detail
																</button>
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
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};
