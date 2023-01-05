import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';

export const MasterPengguna = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataEdit, setDataEdit] = useState([]);
	const [dataTambah, setDataTambah] = useState([]);
	const [dataJabatan, setDataJabatan] = useState([]);
	const [showPass, setShowPass] = useState(false);

	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalEditDataOpen, setModalEditDataOpen] = useState(false);

	useEffect(() => {
		fetch(`${urlGet}masterpengguna`)
			.then(response => response.json())
			.then(response => {
				setData(response);
				fetch(`${urlGet}masterjabatan`)
					.then(response => response.json())
					.then(response => {
						setDataJabatan(response);
					});
			});
	}, []);

	const tambahData = () => {
		fetch(`${urlPost}master/pengguna/tambah.php`, {
			method: 'POST',
			body: JSON.stringify({
				nama_pengguna: dataTambah.nama_pengguna,
				tanggal_lahir: dataTambah.tanggal_lahir,
				no_telepon: dataTambah.no_telepon,
				id_jabatan: dataTambah.id_jabatan,
				password: dataTambah.password,
				jenis_kelamin: dataTambah.jenis_kelamin,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === '1') {
					alert(response.pesan);
					setModalTambahDataOpen(false);
					window.location.reload();
				} else {
					alert(response.pesan);
				}
			});
	};

	const editData = () => {
		fetch(`${urlPost}master/pengguna/edit.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_pengguna: dataEdit.id_pengguna,
				nama_pengguna: dataEdit.nama,
				tanggal_lahir: dataEdit.lahir,
				no_telepon: dataEdit.no_telepon,
				id_jabatan: dataEdit.id_jabatan,
				password: dataEdit.password,
				jenis_kelamin: dataEdit.jenis_kelamin,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === '1') {
					alert(response.pesan);
					setModalEditDataOpen(false);
					window.location.reload();
				} else {
					alert(response.pesan);
				}
			});
	};

	console.log(dataTambah);

	return (
		<>
			<Modal
				show={modalTambahDataOpen}
				onHide={() => setModalTambahDataOpen(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Tambah Data Pengguna</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='mx-5 my-2'>
						<Form
							onSubmit={e => {
								e.preventDefault();
								tambahData();
							}}>
							<Form.Group className='mb-3'>
								<Form.Label>Nama pengguna</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										// console.log(dataTambah);
										setDataTambah({
											...dataTambah,
											nama_pengguna: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tanggal lahir</Form.Label>
								<Form.Control
									type='date'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											tanggal_lahir: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>No telepon</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											no_telepon: e.target.value,
										});
									}}
								/>
								<Form.Text className='text-muted'>
									Masukkan nomor telepon yang menggunakan 0 didepan (contoh :
									081234567890)
								</Form.Text>
							</Form.Group>
							<div className='d-flex '>
								<Form.Group className='mb-3'>
									<Form.Label>Jenis kelamin</Form.Label>
									<Dropdown className='w-100'>
										<Dropdown.Toggle
											variant='outline-secondary'
											id='dropdown-basic'>
											{dataTambah.kelamin
												? dataTambah.kelamin
												: 'Pilih jenis kelamin'}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item
												onClick={() => {
													setDataTambah({
														...dataTambah,
														jenis_kelamin: 'L',
														kelamin: 'Laki-laki',
													});
												}}>
												Laki-laki
											</Dropdown.Item>
											<Dropdown.Item
												onClick={() => {
													setDataTambah({
														...dataTambah,
														jenis_kelamin: 'P',
														kelamin: 'Perempuan',
													});
												}}>
												Perempuan
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group className='mb-3 ms-4'>
									<Form.Label>Jabatan</Form.Label>
									<Dropdown className='w-100'>
										<Dropdown.Toggle
											variant='outline-secondary'
											id='dropdown-basic'>
											{dataTambah.jabatan
												? dataTambah.jabatan
												: 'Pilih jabatan'}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											{dataJabatan.map((item, index) => (
												<Dropdown.Item
													key={index}
													onClick={() => {
														setDataTambah({
															...dataTambah,
															jabatan: item.nama_jabatan,
															id_jabatan: item.id_jabatan,
														});
													}}>
													{item.nama_jabatan}
												</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
							</div>
							<Form.Group className='mb-3'>
								<Form.Label>
									Password{' '}
									<i
										onClick={() => setShowPass(!showPass)}
										className={
											showPass ? 'fas fa-eye-slash' : 'fas fa-eye'
										}></i>
								</Form.Label>
								<Form.Control
									type={showPass ? 'text' : 'password'}
									onChange={e => {
										setDataTambah({
											...dataTambah,
											password: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Button variant='primary' type='submit' className='px-4'>
								Simpan
							</Button>
						</Form>
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={modalEditDataOpen}
				onHide={() => setModalEditDataOpen(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Detail Pengguna : {dataEdit.nama} </div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='mx-5 my-2'>
						<Form
							onSubmit={e => {
								e.preventDefault();
								editData();
							}}>
							<Form.Group className='mb-3'>
								<Form.Label>Nama pengguna</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.nama}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											nama: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tanggal lahir</Form.Label>
								<Form.Control
									type='date'
									defaultValue={dataEdit.lahir}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											lahir: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>No telepon</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.no_telepon}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											no_telepon: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<div className='d-flex'>
								<Form.Group className='mb-3'>
									<Form.Label>Jenis kelamin</Form.Label>
									<Dropdown className='w-100'>
										<Dropdown.Toggle
											variant='outline-secondary'
											id='dropdown-basic'>
											{dataEdit.jenis_kelamin === 'L'
												? 'Laki-laki'
												: dataEdit.jenis_kelamin === 'P'
												? 'Perempuan'
												: 'Pilih jenis kelamin'}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item
												onClick={() => {
													setDataEdit({
														...dataEdit,
														jenis_kelamin: 'L',
													});
												}}>
												Laki-laki
											</Dropdown.Item>
											<Dropdown.Item
												onClick={() => {
													setDataEdit({
														...dataEdit,
														jenis_kelamin: 'P',
													});
												}}>
												Perempuan
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group className='mb-3 ms-4'>
									<Form.Label>Jabatan</Form.Label>
									<Dropdown className='w-100'>
										<Dropdown.Toggle
											variant='outline-secondary'
											id='dropdown-basic'>
											{dataEdit.jabatan}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											{dataJabatan.map((item, index) => (
												<Dropdown.Item
													key={index}
													onClick={() => {
														setDataEdit({
															...dataEdit,
															jabatan: item.nama_jabatan,
															id_jabatan: item.id_jabatan,
														});
													}}>
													{item.nama_jabatan}
												</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
							</div>
							<Form.Group className='mb-3'>
								<Form.Label>
									Password{' '}
									<i
										onClick={() => setShowPass(!showPass)}
										className={
											showPass ? 'fas fa-eye-slash' : 'fas fa-eye'
										}></i>
								</Form.Label>
								<Form.Control
									type={showPass ? 'text' : 'password'}
									defaultValue={dataEdit.password}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											password: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Button variant='primary' type='submit' className='px-4'>
								Simpan
							</Button>
						</Form>
					</div>
				</Modal.Body>
			</Modal>

			<Table striped bordered hover className='text-center'>
				<thead>
					<tr>
						<th className='align-middle'>ID Pengguna</th>
						<th className='align-middle'>Nama pengguna</th>
						<th className='align-middle'>Tanggal lahir</th>
						<th className='align-middle'>No telepon</th>
						<th className='align-middle'>Jenis kelamin</th>
						<th className='align-middle'>Jabatan</th>
						<th className='align-middle'>Kata sandi</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td className='align-middle'>{item.id_pengguna}</td>
							<td className='align-middle'>{item.nama}</td>
							<td className='align-middle'>{item.tanggal_lahir}</td>
							<td className='align-middle'>{item.no_telepon}</td>
							<td className='align-middle'>
								{item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
							</td>
							<td className='align-middle'>{item.jabatan}</td>
							<td className='align-middle'>
								{item.password.replace(/./g, '*')}
							</td>
							<td className='align-middle'>
								<button
									className='btn btn-outline-success'
									onClick={() => {
										setModalEditDataOpen(true);
										setDataEdit(item);
									}}>
									Edit
								</button>
								<button
									className='btn btn-outline-danger ms-2'
									onClick={() => {
										if (
											window.confirm(
												'Apakah anda yakin ingin menghapus data ini?'
											)
										) {
											fetch(`${urlPost}master/pengguna/hapus.php`, {
												method: 'POST',
												body: JSON.stringify({
													id_pengguna: item.id_pengguna,
												}),
											})
												.then(res => res.json())
												.then(res => {
													if (res.status === '1') {
														alert('Data berhasil dihapus');
														window.location.reload();
													} else {
														alert('Data gagal dihapus');
													}
												});
										}
									}}>
									Hapus
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div className='row d-flex flex-row-reverse me-2'>
				<Button
					className='btn btn-success w-auto px-4'
					onClick={() => {
						setModalTambahDataOpen(true);
					}}>
					Tambah
				</Button>
			</div>
		</>
	);
};
