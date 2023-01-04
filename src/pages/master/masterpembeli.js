import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
export const MasterPembeli = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataEdit, setDataEdit] = useState([]);
	const [dataTambah, setDataTambah] = useState([]);

	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalEditDataOpen, setModalEditDataOpen] = useState(false);

	useEffect(() => {
		fetch(`${urlGet}masterpembeli`)
			.then(response => response.json())
			.then(response => {
				setData(response);
			});
	}, []);

	const tambahData = () => {
		fetch(`${urlPost}master/pembeli/tambah.php`, {
			method: 'POST',
			body: JSON.stringify({
				nama_pembeli: dataTambah.nama_pembeli,
				alamat: dataTambah.alamat,
				no_telepon: dataTambah.no_telepon,
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
		fetch(`${urlPost}master/pembeli/edit.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_pembeli: dataEdit.id_pembeli,
				nama_pembeli: dataEdit.nama_pembeli,
				no_telepon: dataEdit.no_telepon,
				alamat: dataEdit.alamat,
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
						<div>Tambah Data Pembeli</div>
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
								<Form.Label>Nama pembeli</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											nama_pembeli: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Alamat</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											alamat: e.target.value,
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
						<div>Detail Pembeli : {dataEdit.nama_pembeli} </div>
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
								<Form.Label>Nama pembeli</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.nama_pembeli}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											nama_pembeli: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Alamat</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.alamat}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											alamat: e.target.value,
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
						<th className='align-middle'>ID Pembeli</th>
						<th className='align-middle'>Nama pembeli</th>
						<th className='align-middle'>Alamat</th>
						<th className='align-middle'>No telepon</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td className='align-middle'>{item.id_pembeli}</td>
							<td className='align-middle'>{item.nama_pembeli}</td>
							<td className='align-middle'>{item.alamat}</td>
							<td className='align-middle'>{item.no_telepon}</td>
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
											fetch(`${urlPost}master/pembeli/hapus.php`, {
												method: 'POST',
												body: JSON.stringify({
													id_pembeli: item.id_pembeli,
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
