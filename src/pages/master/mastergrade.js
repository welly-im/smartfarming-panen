import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
export const MasterGrade = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataEdit, setDataEdit] = useState([]);
	const [dataTambah, setDataTambah] = useState([]);

	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalEditDataOpen, setModalEditDataOpen] = useState(false);

	useEffect(() => {
		fetch(`${urlGet}getgradekopi`)
			.then(response => response.json())
			.then(response => {
				setData(response.data);
			});
	}, []);

	const tambahData = () => {
		fetch(`${urlPost}master/grade/tambah.php`, {
			method: 'POST',
			body: JSON.stringify({
				grade: dataTambah.grade,
				keterangan: dataTambah.keterangan,
				harga_per_kg: dataTambah.harga_per_kg,
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
		fetch(`${urlPost}master/grade/edit.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_grade: dataEdit.id_grade,
				grade: dataEdit.grade,
				harga_per_kg: dataEdit.harga_per_kg,
				keterangan: dataEdit.keterangan,
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
						<div>Tambah Data Grade</div>
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
								<Form.Label>Grade</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											grade: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Keterangan</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											keterangan: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Harga per Kg</Form.Label>
								<Form.Control
									type='text'
									onChange={e => {
										setDataTambah({
											...dataTambah,
											harga_per_kg: e.target.value,
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
						<div>Edit Grade : {dataEdit.grade} </div>
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
								<Form.Label>Grade</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.grade}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											grade: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Keterangan</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.keterangan}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											keterangan: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Harga per Kg</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.harga_per_kg}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											harga_per_kg: e.target.value,
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
						<th className='align-middle'>ID Grade</th>
						<th className='align-middle'>Grade</th>
						<th className='align-middle'>Harga per Kg</th>
						<th className='align-middle'>Keterangan</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td className='align-middle'>{item.id_grade}</td>
							<td className='align-middle'>{item.grade}</td>
							<td className='align-middle'>
								{new Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR',
								}).format(item.harga_per_kg)}
							</td>
							<td className='align-middle'>{item.keterangan}</td>
							<td className='align-middle'>
								<button
									className='btn btn-outline-success'
									onClick={() => {
										setModalEditDataOpen(true);
										setDataEdit(item);
									}}>
									Edit
								</button>
								{/* <button
									className='btn btn-outline-danger ms-2'
									onClick={() => {
										if (
											window.confirm(
												'Apakah anda yakin ingin menghapus data ini?'
											)
										) {
											fetch(`${urlPost}master/grade/hapus.php`, {
												method: 'POST',
												body: JSON.stringify({
													id_grade: item.id_grade,
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
									Delete
								</button> */}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{/* <div className='row d-flex flex-row-reverse me-2'>
				<Button
					className='btn btn-success w-auto px-4'
					onClick={() => {
						setModalTambahDataOpen(true);
					}}>
					Tambah
				</Button>
			</div> */}
		</>
	);
};
