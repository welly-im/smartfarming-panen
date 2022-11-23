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
						<div>Detail ID Panen : {dataModalEditData.id_panen}</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='mx-5 my-2'>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>ID Panen</Form.Label>
								<Form.Control
									type='text'
									placeholder='Masukkkan ID Panen'
									defaultValue={dataModalEditData.id_panen}
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
									defaultValue={dataModalEditData.berat}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tanggal panen</Form.Label>
								<Form.Control
									placeholder='Masukkkan tanggal panen'
									defaultValue={dataModalEditData.tanggal_panen}
								/>
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
								<Button variant='primary' type='submit' className='px-4 w-auto'>
									Edit & Simpan
								</Button>
								<Button
									variant='danger'
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
						{data.length > 0 ? (
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
								<h3 className='mt-3 w-100'>Loading...</h3>
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
