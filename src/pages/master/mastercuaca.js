import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
export const MasterCuaca = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataEdit, setDataEdit] = useState([]);
	const [dataTambah, setDataTambah] = useState([]);

	const [modalTambahDataOpen, setModalTambahDataOpen] = useState(false);
	const [modalEditDataOpen, setModalEditDataOpen] = useState(false);

	useEffect(() => {
		fetch(`${urlGet}mastercuaca`)
			.then(response => response.json())
			.then(response => {
				setData(response);
			});
	}, []);

	const editData = () => {
		fetch(`${urlPost}master/cuaca/edit.php`, {
			method: 'POST',
			body: JSON.stringify({
				id_bulan: dataEdit.id_bulan,
				cuaca: dataEdit.cuaca,
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
				show={modalEditDataOpen}
				onHide={() => setModalEditDataOpen(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Edit Cuaca di bulan {dataEdit.nama_bulan} </div>
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
								<Form.Label>Bulan</Form.Label>
								<Form.Control
									type='text'
									defaultValue={dataEdit.nama_bulan}
									onChange={e => {
										setDataEdit({
											...dataEdit,
											nama_bulan: e.target.value,
										});
									}}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Cuaca</Form.Label>
								<Dropdown className='w-100'>
									<Dropdown.Toggle
										variant='outline-secondary'
										id='dropdown-basic'>
										{dataEdit.cuaca ? dataEdit.cuaca : 'Pilih Cuaca'}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item
											onClick={() => {
												setDataEdit({
													...dataEdit,
													cuaca: 'Hujan',
												});
											}}>
											Hujan
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => {
												setDataEdit({
													...dataEdit,
													cuaca: 'Panas',
												});
											}}>
											Panas
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => {
												setDataEdit({
													...dataEdit,
													cuaca: 'Mendung',
												});
											}}>
											Mendung
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
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
						<th className='align-middle'>Bulan</th>
						<th className='align-middle'>Cuaca</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td className='align-middle'>{item.nama_bulan}</td>
							<td className='align-middle'>{item.cuaca}</td>
							<td className='align-middle'>
								<button
									className='btn btn-outline-success'
									onClick={() => {
										setModalEditDataOpen(true);
										setDataEdit(item);
									}}>
									Edit
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
