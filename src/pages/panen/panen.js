import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import { Header } from '../../components/header';
import Cookies from 'js-cookie';

export const Panen = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalEditDataOpen, setModalEditDataOpen] = useState(false);
	const [dataModalEditData, setDataModalEditData] = useState([]);

	const [idPanenBaru, setIdPanenBaru] = useState(
		`P${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
	);
	const [beratPanenBaru, setBeratPanenBaru] = useState('');
	const [tanggalPanenBaru, setTanggalPanenBaru] = useState('');

	const formNewDataPanen = new FormData();
	formNewDataPanen.append('id_panen', idPanenBaru);
	formNewDataPanen.append('berat', beratPanenBaru);
	formNewDataPanen.append('tanggal_panen', tanggalPanenBaru);
	formNewDataPanen.append('id_pengguna', Cookies.get('id_pengguna'));

	const [idPanenEdit, setIdPanenEdit] = useState('');
	const [beratPanenEdit, setBeratPanenEdit] = useState('');
	const [tanggalPanenEdit, setTanggalPanenEdit] = useState('');

	const formEditDataPanen = new FormData();
	formEditDataPanen.append('id_panen', idPanenEdit);
	formEditDataPanen.append('berat', beratPanenEdit);
	formEditDataPanen.append('tanggal_panen', tanggalPanenEdit);
	formEditDataPanen.append('id_pengguna', Cookies.get('id_pengguna'));

	useEffect(() => {
		fetch(`${urlGet}datapanen`)
			.then(response => response.json())
			.then(response => {
				setData(response);
			});
	}, []);

	const closeModal = () => {
		setIdPanenBaru('');
		setBeratPanenBaru('');
		setTanggalPanenBaru('');
		setModalTambahDataOpen(false);
	};
	const closeModalEditData = () => {
		setModalEditDataOpen(false);
	};

	const onSubmitTambahData = () => {
		fetch(`${urlPost}panen/tambahdatapanen.php`, {
			method: 'POST',
			body: formNewDataPanen,
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === '1') {
					setModalTambahDataOpen(false);
					alert('Data berhasil ditambahkan');
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
	};

	const onSubmitEditData = () => {
		fetch(`${urlPost}panen/editdatapanen.php`, {
			method: 'POST',
			body: formEditDataPanen,
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === '1') {
					setModalEditDataOpen(false);
					alert('Data berhasil diubah!');
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
	};

	const handleHapusData = () => {
		const confirmDelete = window.confirm(
			`Apakah anda yakin, menghapus ID : ${idPanenEdit}?`
		);
		if (confirmDelete) {
			fetch(`${urlPost}panen/hapusdatapanen.php`, {
				method: 'POST',
				body: formEditDataPanen,
			})
				.then(response => response.json())
				.then(response => {
					if (response.status === '1') {
						setModalEditDataOpen(false);
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
	};

	return (
		<>
			<Modal
				show={modalTambahDataOpen}
				onHide={closeModal}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Tambah Data Panen</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='mx-5 my-2'>
						<Form
							onSubmit={e => {
								e.preventDefault();
								onSubmitTambahData();
							}}>
							<Form.Group className='mb-3'>
								<Form.Label>ID Panen</Form.Label>
								<Form.Control
									type='text'
									defaultValue={
										'P' +
										new Date().toISOString().slice(0, 10).replace(/-/g, '')
									}
									onChange={e => setIdPanenBaru(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									Ubah ID Panen jika tanggal saat data dimasukkan bukan tanggal
									hari ini.
								</Form.Text>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Berat (kg)</Form.Label>
								<Form.Control
									type='number'
									placeholder='Masukkkan Berat'
									onChange={e => setBeratPanenBaru(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tanggal panen</Form.Label>
								<Form.Control
									type='date'
									placeholder='Masukkkan tanggal panen'
									onChange={e => setTanggalPanenBaru(e.target.value)}
								/>
							</Form.Group>
							<Button variant='primary' type='submit' className='px-4'>
								Submit
							</Button>
						</Form>
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={modalEditDataOpen}
				onHide={closeModalEditData}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Detail ID Panen : {idPanenEdit}</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='mx-5 my-2'>
						<Form
							onSubmit={e => {
								e.preventDefault();
								onSubmitEditData();
							}}>
							<Form.Group className='mb-3'>
								<Form.Label>ID Panen</Form.Label>
								<Form.Control
									type='text'
									placeholder='Masukkkan ID Panen'
									value={idPanenEdit}
								/>
								<Form.Text className='text-muted'>
									ID Panen tidak dapat diubah, silahkan hapus data jika ingin
									mengubah data!
								</Form.Text>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Berat (kg)</Form.Label>
								<Form.Control
									type='number'
									placeholder='Masukkkan Berat'
									defaultValue={beratPanenEdit}
									onChange={e => setBeratPanenEdit(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tanggal panen</Form.Label>
								<Form.Control
									placeholder='Masukkkan tanggal panen'
									defaultValue={tanggalPanenEdit}
									onChange={e => setTanggalPanenEdit(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									Tanggal yang di masukkan harus sesuai format
									tahun-bulan-tanggal!
								</Form.Text>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Pengelola</Form.Label>
								<Form.Control
									type='text'
									placeholder='Masukkkan tanggal panen'
									defaultValue={dataModalEditData.nama_pengguna}
								/>
							</Form.Group>
							<div className='row mx-1 d-flex justify-content-between mt-3'>
								<div className='w-auto'>
									<Button variant='primary' type='submit' className='px-4'>
										Edit & Simpan
									</Button>
									<Button
										variant='danger'
										className='px-4 ms-5'
										onClick={() => {
											handleHapusData();
										}}>
										Hapus
									</Button>
								</div>
								<Button
									variant='secondary'
									onClick={closeModalEditData}
									className='px-4 w-auto ms-5'>
									Tutup
								</Button>
							</div>
						</Form>
					</div>
				</Modal.Body>
			</Modal>

			<Header />
			<div className='container card p-4 mt-3'>
				<div className='card-body shadow bg-white rounded'>
					<h4>Data panen</h4>
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
										<th className='align-middle'>ID Panen</th>
										<th className='align-middle'>Berat</th>
										<th className='align-middle'>Tanggal panen</th>
										<th className='align-middle'>Pengelola</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{data.map(item => {
										return (
											<tr key={item.id_panen}>
												<td className='align-middle'>{item.id_panen}</td>
												<td className='align-middle'>{item.berat} kg</td>
												<td className='align-middle'>{item.tanggal_panen}</td>
												<td className='align-middle'>{item.nama_pengguna}</td>
												<td className='align-middle'>
													<button
														className='btn btn-warning'
														onClick={() => {
															setIdPanenEdit(item.id_panen);
															setBeratPanenEdit(item.berat);
															setTanggalPanenEdit(item.web_tanggal_panen);
															setDataModalEditData(item);
															setModalEditDataOpen(true);
														}}>
														Detail
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
									Tidak ada data panen, coba refresh...
								</h3>
							</>
						)}
					</div>
					<div className='row d-flex flex-row-reverse me-2'>
						<Button
							className='btn btn-success w-auto px-4'
							onClick={() => {
								setModalTambahDataOpen(true);
							}}>
							Tambah
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
