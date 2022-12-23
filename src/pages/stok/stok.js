import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Dropdown } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import { Header } from '../../components/header';
import Cookies from 'js-cookie';

export const Stok = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataBelumGiling, setDataBelumGiling] = useState([]);
	const [dataTambahStok, setDataTambahStok] = useState([]);
	const [detailInfoPengolahan, setDetailInfoPengolahan] = useState('');
	const [dataGrade, setDataGrade] = useState([]);
	const [dataPembeli, setDataPembeli] = useState([]);
	const [dataDetailStok, setDataDetailStok] = useState([]);
	const [showDataBelumGiling, setShowDataBelumGiling] = useState(false);
	const [showTambahStok, setShowTambahStok] = useState(false);
	const [showDetailStok, setShowDetailStok] = useState(false);

	useEffect(() => {
		fetch(`${urlGet}getpenjemuranbelumgiling`)
			.then(response => response.json())
			.then(response => {
				if (response.status === '1') {
					setDataBelumGiling(response.data);
					setShowDataBelumGiling(true);
					fetch(`${urlGet}getdatastokkopibelumjual`)
						.then(response => response.json())
						.then(response => {
							setData(response.data);
						});
				}
			})
			.catch(err => {
				fetch(`${urlGet}getdatastokkopibelumjual`)
					.then(response => response.json())
					.then(response => {
						setData(response.data);
					});
			});
		fetch(`${urlGet}masterpembeli`)
			.then(response => response.json())
			.then(response => {
				setDataPembeli(response);
			});
	}, []);

	const handleTambahStok = () => {
		fetch(`${urlPost}stok/tambahstok.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_stok: dataTambahStok.id_stok,
				tanggal_masuk: dataTambahStok.tanggal_masuk,
				berat_kopi_tanpa_kulit: dataTambahStok.berat_kopi_tanpa_kulit,
				info_stok: detailInfoPengolahan,
				id_grade: dataTambahStok.id_grade,
				id_penjemuran: dataBelumGiling[0].id_penjemuran,
				id_pengguna: Cookies.get('id_pengguna'),
			}),
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				if (response.status === '1') {
					alert(response.pesan);
					setShowTambahStok(false);
					window.location.reload();
				} else {
					alert(response.pesan);
				}
			})
			.catch(err => {
				alert(err);
			});
	};

	const handleJualStok = () => {
		fetch(`${urlPost}stok/tambahpenjualan.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_penjualan: dataDetailStok.id_penjualan,
				tanggal_penjualan: dataDetailStok.tanggal_penjualan,
				berat_kopi: dataDetailStok.berat_kopi_tanpa_kulit,
				harga_penjualan: dataDetailStok.harga_penjualan,
				id_pembeli: dataDetailStok.id_pembeli,
				id_stok: dataDetailStok.id_stok,
				id_pengguna: Cookies.get('id_pengguna'),
			}),
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				if (response.status === '1') {
					alert(response.pesan);
					setShowDetailStok(false);
					window.location.reload();
				} else {
					alert(response.pesan);
				}
			})
			.catch(err => {
				alert(err);
			});
	};

	return (
		<>
			<Modal
				show={showDataBelumGiling}
				onHide={() => setShowDataBelumGiling(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Kopi yang belum dimasukkan ke dalam stok</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className=' my-2'>
						{dataBelumGiling !== null && dataBelumGiling.length > 0 ? (
							<Table striped bordered hover className='text-center'>
								<thead>
									<tr>
										<th className='align-middle'>ID Penjemuran</th>
										<th className='align-middle'>Tanggal akhir penjemuran</th>
										<th className='align-middle'>Berat akhir penjemuran</th>
										<th className='align-middle'>Pengelola</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{dataBelumGiling.map((item, index) => (
										<tr key={index}>
											<td className='align-middle'>{item.id_penjemuran}</td>
											<td className='align-middle'>
												{item.tanggal_akhir_proses}
											</td>
											<td className='align-middle'>
												{item.berat_akhir_proses + ' Kg'}
											</td>
											<td className='align-middle'>{item.nama_pengguna}</td>
											<td className='align-middle'>
												<Button
													variant='outline-info'
													className='btn-sm'
													onClick={() => {
														fetch(`${urlPost}stok/infopengolahan.php`, {
															method: 'POST',
															body: JSON.stringify({
																id_penjemuran: item.id_penjemuran,
															}),
														})
															.then(response => response.json())
															.then(response => {
																fetch(`${urlGet}getgradekopi`)
																	.then(res => res.json())
																	.then(res => {
																		setDataGrade(res.data);
																	});
																setDetailInfoPengolahan(
																	response.info_pengolahan
																);
																setDataTambahStok(item);
																setShowTambahStok(true);
															})
															.catch(err => {
																alert('Info pengolahan tidak ditemukan');
															});
													}}>
													Tambahkan
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						) : (
							<>
								<h3 className='mt-3 w-100'>Tidak ada data, coba refresh...</h3>
							</>
						)}
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={showTambahStok}
				onHide={() => setShowTambahStok(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Tambah Stok Kopi Jadi</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleTambahStok();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Stok</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Stok'
													defaultValue={dataTambahStok.id_stok}
													onChange={e => {
														setDataTambahStok({
															...dataTambahStok,
															id_stok: e.target.value,
														});
													}}
												/>
												<Form.Text className='text-muted'>
													ID otomatis terbuat jika memasukkan tanggal dan grade.
												</Form.Text>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal masuk gudang</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal masuk stok'
													type='date'
													defaultValue={dataTambahStok.tanggal_masuk}
													onChange={e => {
														setDataTambahStok({
															...dataTambahStok,
															tanggal_masuk: e.target.value,
														});
													}}
												/>
												<Form.Text className='text-muted'>
													Jika ingin mengganti tanggal, maka Grade harus dipilih
													ulang!
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat kopi tanpa kulit(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat kopi tanpa kulit'
													defaultValue={dataTambahStok.berat_kopi_tanpa_kulit}
													onChange={e =>
														setDataTambahStok({
															...dataTambahStok,
															berat_kopi_tanpa_kulit: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Pilih grade</Form.Label>
												<Dropdown className='w-100'>
													<Dropdown.Toggle
														variant='outline-secondary'
														id='dropdown-basic'>
														{dataTambahStok.grade === undefined
															? 'Pilih grade'
															: dataTambahStok.grade}
													</Dropdown.Toggle>
													<Dropdown.Menu>
														{dataGrade.map((grade, index) => {
															return (
																<Dropdown.Item
																	key={grade.id_grade}
																	onClick={() => {
																		setDataTambahStok({
																			...dataTambahStok,
																			id_stok:
																				'STK' +
																				//remove - from date
																				dataTambahStok.tanggal_masuk.replace(
																					/-/g,
																					''
																				) +
																				grade.grade,
																			id_grade: grade.id_grade,
																			grade: grade.grade,
																		});
																	}}>
																	{grade.grade}
																</Dropdown.Item>
															);
														})}
													</Dropdown.Menu>
												</Dropdown>
											</Form.Group>
										</div>
									</div>
									<div className='row mx-1 d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											<Button
												variant='outline-success'
												type='submit'
												className='px-4'>
												Tambah Data
											</Button>
											<Button
												variant='outline-danger'
												className='px-4 ms-5'
												onClick={() => {
													setShowTambahStok(false);
												}}>
												Batal
											</Button>
										</div>
									</div>
								</Form>
							</div>
						</div>
						<div className='col-6'>
							<div className='card'>
								<div className='card-body shadow bg-white rounded'>
									<h5 className='text-center'>Detail penjemuran</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Penjemuran</th>
													<td className='align-middle'>
														{dataTambahStok.id_penjemuran}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat kopi (dengan kulit)</th>
													<td className='align-middle'>
														{dataTambahStok.berat_akhir_proses} kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Diolah dengan cara</th>
													<td className='align-middle'>
														{detailInfoPengolahan}
													</td>
												</tr>
											</tbody>
										</table>
										<h5 className='text-center'>Info grade</h5>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th>Grade</th>
													<th>Keterangan</th>
												</tr>
												{dataGrade.map((grade, index) => {
													return (
														<tr key={index}>
															<td>{grade.grade}</td>
															<td>{grade.keterangan}</td>
														</tr>
													);
												})}
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
				show={showDetailStok}
				onHide={() => setShowDetailStok(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Jual stok kopi : {dataDetailStok.id_stok}</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='my-2'>
						<div className='row'>
							<div className='col-6'>
								<div className='my-2'>
									<Form
										onSubmit={e => {
											e.preventDefault();
											handleJualStok();
										}}>
										<div className='card'>
											<div className='card-body shadow bg-white rounded'>
												<Form.Group>
													<Form.Label>ID Stok</Form.Label>
													<Form.Control
														type='text'
														value={
															dataDetailStok.id_penjualan === undefined
																? 'Masukkan tanggal penjualan dulu'
																: dataDetailStok.id_penjualan
														}
														disabled
													/>
												</Form.Group>
												<Form.Group>
													<Form.Label>Tanggal penjualan</Form.Label>
													<Form.Control
														type='date'
														onChange={e => {
															setDataDetailStok({
																...dataDetailStok,
																tanggal_penjualan: e.target.value,
																id_penjualan:
																	`PJ` +
																	`${e.target.value.replace(/-/g, '')}` +
																	`${dataDetailStok.grade}`,
															});
														}}
													/>
												</Form.Group>

												<Form.Group className='mt-2'>
													<Form.Label>Berat stok(kg)</Form.Label>
													<Form.Control
														type='number'
														value={dataDetailStok.berat_kopi_tanpa_kulit}
														disabled
													/>
												</Form.Group>
												<Form.Group className='my-3'>
													<Form.Label>Grade</Form.Label>
													<Form.Control value={dataDetailStok.grade} disabled />
												</Form.Group>
												<Form.Group className='my-3'>
													<Form.Label>Harga penjualan</Form.Label>
													<Form.Control
														placeholder='Masukkkan harga penjualan'
														onChange={e =>
															setDataDetailStok({
																...dataDetailStok,
																harga_penjualan: e.target.value,
															})
														}
													/>
													<Form.Text className='text-muted'>
														Harga penjualan yang disarankan adalah{' '}
														{new Intl.NumberFormat('id-ID', {
															style: 'currency',
															currency: 'IDR',
														}).format(dataDetailStok.harga_jual)}
													</Form.Text>
												</Form.Group>
												<Form.Group className='mt-2'>
													<Form.Label>Pilih pembeli</Form.Label>
													<Dropdown className='w-100'>
														<Dropdown.Toggle
															variant='outline-secondary'
															id='dropdown-basic'>
															{dataDetailStok.nama_pembeli === undefined
																? 'Pilih pembeli'
																: dataDetailStok.nama_pembeli}
														</Dropdown.Toggle>
														<Dropdown.Menu>
															{dataPembeli.map((item, index) => (
																<Dropdown.Item
																	key={index}
																	onClick={() =>
																		setDataDetailStok({
																			...dataDetailStok,
																			nama_pembeli: item.nama_pembeli,
																			id_pembeli: item.id_pembeli,
																		})
																	}>
																	{item.nama_pembeli}
																</Dropdown.Item>
															))}
														</Dropdown.Menu>
													</Dropdown>
												</Form.Group>
											</div>
										</div>
										<div className='row d-flex justify-content-between mt-3'>
											<div className='w-auto'>
												<Button
													variant='outline-success'
													type='submit'
													className='px-4'>
													Jual Kopi
												</Button>
											</div>
										</div>
									</Form>
								</div>
							</div>
							<div className='col-6'>
								<div className='card'>
									<div className='card-body shadow bg-white rounded'>
										<h5 className='text-center'>Detail Grade</h5>
										<div className='table-responsive'>
											<table className='table table-bordered'>
												<tbody>
													<tr>
														<th scope='row' className='align-middle'>
															Harga Per Kg
														</th>
														<td className='align-middle'>
															{new Intl.NumberFormat('id-ID', {
																style: 'currency',
																currency: 'IDR',
															}).format(dataDetailStok.harga_per_kg)}
														</td>
													</tr>
													<tr>
														<th scope='row' className='align-middle'>
															Keterangan
														</th>
														<td className='align-middle'>
															{dataDetailStok.keterangan}
														</td>
													</tr>
												</tbody>
											</table>
											<h5 className='text-center'>Info Pembeli</h5>
											<table className='table table-bordered'>
												<tbody>
													<tr>
														<th>Nama Pembeli</th>
														<th>Alamat</th>
													</tr>
													{dataPembeli.map((item, index) => (
														<tr key={index}>
															<td>{item.nama_pembeli}</td>
															<td>{item.alamat}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
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
					<h4>Data stok</h4>
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
										<th className='align-middle'>Berat</th>
										<th className='align-middle'>Tanggal masuk</th>
										<th className='align-middle'>Grade</th>
										<th className='align-middle'>Info stok</th>
										<th className='align-middle'>Pengelola</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{data.map(item => {
										return (
											<tr key={item.id_panen}>
												<td className='align-middle'>{item.id_stok}</td>
												<td className='align-middle'>
													{item.berat_kopi_tanpa_kulit} kg
												</td>
												<td className='align-middle'>{item.tanggal_masuk}</td>
												<td className='align-middle'>{item.grade}</td>
												<td className='align-middle'>{item.info_stok}</td>
												<td className='align-middle'>{item.nama_pengguna}</td>
												<td className='align-middle'>
													<button
														className='btn btn-outline-success btn-sm'
														onClick={() => {
															setShowDetailStok(true);
															setDataDetailStok(item);
														}}>
														Jual
													</button>
													<button
														className='ms-4 btn btn-outline-danger btn-sm'
														onClick={() => {
															//confirm delete
															if (
																window.confirm(
																	'Apakah anda yakin ingin menghapus data stok ini?'
																)
															) {
																alert('Data stok berhasil dihapus');
															}
														}}>
														Hapus Stok
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						) : (
							<>
								<h3 className='mt-3 w-100'>
									Tidak ada data stok kopi yang tersedia . . .
								</h3>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
