import { useEffect, useState } from 'react';
import { Tabs, Tab, Table, Button, Form, Modal } from 'react-bootstrap';
import { Header } from '../../components/header';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';

export const Sorting = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [dataPanen, setDataPanen] = useState([]);
	const [dataBagus, setDataBagus] = useState([]);
	const [dataJelek, setDataJelek] = useState([]);
	const [dataDetail, setDataDetail] = useState([]);
	const [dataDetailPanen, setDataDetailPanen] = useState([]);
	const [modalPilihID, setModalPilihID] = useState(false);
	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalDetailPanen, setModalDetailPanen] = useState(false);
	const [modalDetail, setModalDetail] = useState(false);

	const [idSortingBagusBaru, setIdSortingBagusBaru] = useState(
		'PRM' + new Date().toISOString().slice(0, 10).replace(/-/g, '')
	);
	const [idSortingJelekBaru, setIdSortingJelekBaru] = useState(
		'STD' + new Date().toISOString().slice(0, 10).replace(/-/g, '')
	);
	const [beratBagusBaru, setBeratBagusBaru] = useState('');
	const [beratJelekBaru, setBeratJelekBaru] = useState('');
	const [tanggalSorting, setTanggalSorting] = useState('');

	const formDataSortingBaru = new FormData();
	formDataSortingBaru.append('id_sorting_bagus', idSortingBagusBaru);
	formDataSortingBaru.append('id_sorting_jelek', idSortingJelekBaru);
	formDataSortingBaru.append('berat_kopi_bagus', beratBagusBaru);
	formDataSortingBaru.append('berat_kopi_jelek', beratJelekBaru);
	formDataSortingBaru.append('tanggal_sorting', tanggalSorting);
	formDataSortingBaru.append('id_panen', modalDetailPanen.id_panen);
	formDataSortingBaru.append('id_pengguna', Cookies.get('id_pengguna'));

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

	const handlePilihID = () => {
		setModalPilihID(true);
		fetch(`${urlGet}getidpanenbelumproses`)
			.then(response => response.json())
			.then(response => {
				setDataPanen(response.data);
			});
	};

	const onSubmitTambahDataSorting = () => {
		if (
			parseInt(modalDetailPanen.berat) !==
			parseInt(beratBagusBaru) + parseInt(beratJelekBaru)
		) {
			alert(
				`Berat yang dimasukkan tidak sesuai, beda ${
					parseInt(modalDetailPanen.berat) -
					(parseInt(beratBagusBaru) + parseInt(beratJelekBaru))
				} kg!`
			);
		} else {
			fetch(`${urlPost}sorting/tambahdatasorting.php`, {
				method: 'POST',
				body: formDataSortingBaru,
			})
				.then(response => response.json())
				.then(response => {
					if (response.status === '1') {
						setModalTambahDataOpen(false);
						alert(response.pesan);
						window.location.reload();
					} else {
						alert(response.pesan);
					}
				})
				.catch(error => {
					console.log(error);
					alert('Gagal menambahkan data, ada kesalahan!');
				});
		}
	};

	const modalDetailSortingJelek = () => {
		setModalDetail(true);
	};

	return (
		<>
			<Modal
				show={modalPilihID}
				onHide={() => setModalPilihID(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Pilih ID Panen</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row px-3'>
						{dataPanen.length > 0 ? (
							<>
								<Table striped bordered hover className='text-center'>
									<thead>
										<tr>
											<th className='align-middle'>ID Panen</th>
											<th className='align-middle'>Berat</th>
											<th className='align-middle'>Tanggal panen</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{dataPanen.map(item => {
											return (
												<tr key={item.id_sorting}>
													<td className='align-middle'>{item.id_panen}</td>
													<td className='align-middle'>{item.berat} kg</td>
													<td className='align-middle'>{item.tanggal_panen}</td>
													<td className='align-middle'>
														<button
															className='btn btn-success'
															onClick={() => {
																setModalDetailPanen(item);
																setModalTambahDataOpen(true);
																setModalPilihID(false);
															}}>
															Pilih Data
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</>
						) : (
							<>
								<h5 className='mt-3 w-100 text-center'>
									Data panen sudah disorting semua, <br />
									Tidak ada data panen yang belum disorting!
								</h5>
							</>
						)}
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={modalTambahDataOpen}
				onHide={() => setModalTambahDataOpen(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Tambah Data Sorting</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										onSubmitTambahDataSorting();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Sorting premium</Form.Label>
												<Form.Control
													type='text'
													defaultValue={
														'PRM' +
														new Date()
															.toISOString()
															.slice(0, 10)
															.replace(/-/g, '')
													}
													onChange={e => setIdSortingBagusBaru(e.target.value)}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat (kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan Berat'
													onChange={e => setBeratBagusBaru(e.target.value)}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='card mt-3'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Sorting standard</Form.Label>
												<Form.Control
													type='text'
													defaultValue={
														'STD' +
														new Date()
															.toISOString()
															.slice(0, 10)
															.replace(/-/g, '')
													}
													onChange={e => setIdSortingJelekBaru(e.target.value)}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat (kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan Berat'
													onChange={e => {
														setBeratJelekBaru(e.target.value);
													}}
												/>
											</Form.Group>
										</div>
									</div>
									<Form.Group className='my-3'>
										<Form.Label>Tanggal sorting</Form.Label>
										<Form.Control
											type='date'
											placeholder='Masukkkan tanggal panen'
											onChange={e => setTanggalSorting(e.target.value)}
										/>
									</Form.Group>
									<Button variant='primary' type='submit' className='px-4'>
										Submit
									</Button>
								</Form>
							</div>
						</div>
						<div className='col-6'>
							<div className='card'>
								<div className='card-body shadow bg-white rounded'>
									<h5 className='text-center'>Detail data panen</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Panen</th>
													<td>{modalDetailPanen.id_panen}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{modalDetailPanen.berat} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal panen</th>
													<td>{modalDetailPanen.tanggal_panen}</td>
												</tr>
												<tr>
													<th scope='row'>Pengelola</th>
													<td>{modalDetailPanen.nama_pengguna}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={modalDetail}
				onHide={() => setModalDetail(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Edit ID Sorting : {dataDetailPanen.id_sorting}</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										onSubmitTambahDataSorting();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Sorting</Form.Label>
												<Form.Control
													type='text'
													value={dataDetailPanen.id_sorting}
													onChange={e => setIdSortingBagusBaru(e.target.value)}
												/>
												<Form.Text className='text-muted'>
													ID Sorting tidak dapat diubah, silahkan hapus data
													jika ingin mengubah data. Data premium dan standard
													akan otomatis terhapus semua!
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat (kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan Berat'
													defaultValue={dataDetailPanen.berat_sorting}
													onChange={e => setBeratBagusBaru(e.target.value)}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal sorting</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal panen'
													defaultValue={dataDetailPanen.tanggal_sorting}
													onChange={e => setTanggalSorting(e.target.value)}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='row mx-1 d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											{/* <Button variant='primary' type='submit' className='px-4'>
												Edit & Simpan
											</Button> */}
											<Button
												variant='danger'
												className='px-4 ms-5'
												onClick={() => {
													const confirmDelete = window.confirm(
														`Apakah anda yakin, menghapus SEMUA data sorting dari ID Panen: ${dataDetailPanen.id_panen}?`
													);
													if (confirmDelete) {
														fetch(`${urlPost}sorting/hapusdata.php/`, {
															method: 'POST',
															body: JSON.stringify({
																id_panen: dataDetailPanen.id_panen,
															}),
														})
															.then(response => response.json())
															.then(response => {
																if (response.status === '1') {
																	setModalDetail(false);
																	alert('Data berhasil dihapus!');
																	window.location.reload();
																} else if (response.status === '0') {
																	alert(response.pesan);
																} else {
																	alert('Ada kesalahan, silahkan coba lagi!');
																}
															})
															.catch(err => {
																alert('Ada kesalahan, silahkan coba lagi!');
															});
													}
												}}>
												Hapus
											</Button>
										</div>
									</div>
								</Form>
							</div>
						</div>
						<div className='col-6'>
							<div className='card'>
								<div className='card-body shadow bg-white rounded'>
									<h5 className='text-center'>Detail data panen</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Panen</th>
													<td>{dataDetailPanen.id_panen}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{dataDetailPanen.berat} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal panen</th>
													<td>{dataDetailPanen.tanggal_panen}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Header />
			<div className='container card p-4 mt-3'>
				<div className='card-body shadow bg-white rounded'>
					<div className='d-flex justify-content-between'>
						<h4>Data sortingan kopi</h4>
						<Button
							className='btn btn-success w-auto px-4'
							onClick={() => handlePilihID()}>
							Tambah Sortingan
						</Button>
					</div>
					<Tabs
						defaultActiveKey='SortingBagus'
						transition={true}
						id='noanim-tab-example'
						className='mb-3'>
						<Tab eventKey='SortingBagus' title='Sortingan Premium'>
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
														<td className='align-middle'>{item.id_sorting}</td>
														<td className='align-middle'>{item.berat} kg</td>
														<td className='align-middle'>
															{item.tanggal_sorting}
														</td>
														<td className='align-middle'>
															{item.nama_pengguna}
														</td>
														<td className='align-middle'>
															<button
																className='btn btn-warning'
																onClick={() => {
																	fetch(
																		`${urlPost}sorting/getidsortingbagus.php/`,
																		{
																			method: 'POST',
																			body: JSON.stringify({
																				id_sorting: item.id_sorting,
																			}),
																		}
																	)
																		.then(response => response.json())
																		.then(response => {
																			setDataDetailPanen(response);
																			setModalDetail(true);
																		});
																}}>
																Detail
															</button>
														</td>
													</tr>
												);
											})}
										</>
									) : (
										<>
											<h3 className='mt-3 w-100'>Tidak ada data...</h3>
										</>
									)}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey='SortingJelek' title='Sortingan Standard'>
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
														<td className='align-middle'>{item.id_sorting}</td>
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
											<h3 className='mt-3 w-100'>Tidak ada data...</h3>
										</>
									)}
								</tbody>
							</Table>
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};
