import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';

export const PengolahanJelek = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [dataDetail, setDataDetail] = useState([]);
	const [showModalDetail, setShowModalDetail] = useState(false);
	const [showModalUpdateFermentasi, setShowModalUpdateFermentasi] =
		useState(false);
	const [showModalTambahFermentasi, setShowModalTambahFermentasi] =
		useState(false);
	const [showModalSelesaikanFermentasi, setShowModalSelesaikanFermentasi] =
		useState(false);
	const [dataDetailTambahFermentasi, setDataDetailTambahFermentasi] = useState(
		[]
	);
	const [dataDetailSelesaikanFermentasi, setDataDetailSelesaikanFermentasi] =
		useState([]);
	const [dataDetailUpdateFermentasi, setDataDetailUpdateFermentasi] = useState(
		[]
	);
	const [showModalTambahPenjemuran, setShowModalTambahPenjemuran] =
		useState(false);
	const [showModalSelesaikanPenjemuran, setShowModalSelesaikanPenjemuran] =
		useState(false);
	const [showModalUpdatePenjemuran, setShowModalUpdatePenjemuran] =
		useState(false);
	const [
		showModalTambahPenjemuranTanpaFermentasi,
		setShowModalTambahPenjemuranTanpaFermentasi,
	] = useState(false);
	const [dataDetailTambahPenjemuran, setDataDetailTambahPenjemuran] = useState(
		[]
	);
	const [
		dataDetailTambahPenjemuranTanpaFermentasi,
		setDataDetailTambahPenjemuranTanpaFermentasi,
	] = useState([]);
	const [dataDetailSelesaikanPenjemuran, setDataDetailSelesaikanPenjemuran] =
		useState([]);
	const [dataDetailUpdatePenjemuran, setDataDetailUpdatePenjemuran] = useState(
		[]
	);

	useEffect(() => {
		fetch(`${urlGet}datasortingjelek`)
			.then(response => response.json())
			.then(response => {
				setData(response.data);
			});
	}, []);

	const handleTambahFermentasi = () => {
		if (
			parseInt(dataDetailTambahFermentasi.berat_awal_fermentasi) !==
			parseInt(dataDetailTambahFermentasi.berat_sorting)
		) {
			alert('Berat awal fermentasi tidak sama dengan berat sorting');
		} else {
			fetch(`${urlPost}pengolahan/jelek/tambahfermentasijelek.php`, {
				method: 'POST',
				body: JSON.stringify({
					id_panen: dataDetailTambahFermentasi.id_panen,
					id_sorting: dataDetailTambahFermentasi.id_sorting,
					id_fermentasi: dataDetailTambahFermentasi.id_fermentasi,
					berat_awal_proses: dataDetailTambahFermentasi.berat_awal_fermentasi,
					tanggal_awal_proses:
						dataDetailTambahFermentasi.tanggal_awal_fermentasi,
					tanggal_akhir_proses:
						dataDetailTambahFermentasi.tanggal_akhir_fermentasi,
					id_pengguna: Cookies.get('id_pengguna'),
				}),
			})
				.then(response => response.json())
				.then(response => {
					alert(response.pesan);
					setShowModalTambahFermentasi(false);
					window.location.reload();
				});
		}
	};

	const handleSelesaikanFermentasi = () => {
		if (
			parseInt(dataDetailSelesaikanFermentasi.berat_akhir_fermentasi) >
			parseInt(dataDetailSelesaikanFermentasi.berat_awal_fermentasi)
		) {
			alert(
				'Berat akhir fermentasi tidak boleh lebih besar dari berat awal fermentasi'
			);
		} else {
			if (window.confirm('Apakah anda yakin ingin menyelesaikan fermentasi?')) {
				fetch(`${urlPost}pengolahan/jelek/selesaikanfermentasijelek.php`, {
					method: 'POST',
					body: JSON.stringify({
						id_fermentasi: dataDetailSelesaikanFermentasi.id_fermentasi,
						berat_akhir_proses:
							dataDetailSelesaikanFermentasi.berat_akhir_fermentasi,
						tanggal_akhir_proses:
							dataDetailSelesaikanFermentasi.tanggal_akhir_fermentasi,
						id_pengguna: Cookies.get('id_pengguna'),
					}),
				})
					.then(response => response.json())
					.then(response => {
						alert(response.pesan);
						setShowModalSelesaikanFermentasi(false);
						window.location.reload();
					});
			}
		}
	};
	const handleUpdateFermentasi = () => {
		if (
			parseInt(dataDetailUpdateFermentasi.berat_akhir_fermentasi) >=
			parseInt(dataDetailUpdateFermentasi.berat_awal_fermentasi)
		) {
			alert(
				'Berat akhir fermentasi tidak boleh lebih besar dari berat awal fermentasi'
			);
		} else {
			fetch(`${urlPost}pengolahan/jelek/editfermentasijelek.php`, {
				method: 'POST',
				body: JSON.stringify({
					id_fermentasi: dataDetailUpdateFermentasi.id_fermentasi,
					berat_akhir_proses: dataDetailUpdateFermentasi.berat_akhir_fermentasi,
					tanggal_akhir_proses:
						dataDetailUpdateFermentasi.tanggal_akhir_fermentasi,
					id_pengguna: Cookies.get('id_pengguna'),
				}),
			})
				.then(response => response.json())
				.then(response => {
					alert(response.pesan);
					setShowModalUpdateFermentasi(false);
					window.location.reload();
				});
		}
	};

	const handleTambahPenjemuran = () => {
		if (
			parseInt(dataDetailTambahPenjemuran.berat_awal_penjemuran) !==
			parseInt(dataDetailTambahPenjemuran.berat_akhir_fermentasi)
		) {
			alert('Berat awal penjemuran tidak sama dengan berat akhir fermentasi');
		} else {
			fetch(`${urlPost}pengolahan/jelek/tambahpenjemuranjelek.php`, {
				method: 'POST',
				body: JSON.stringify({
					id_panen: dataDetailTambahPenjemuran.id_panen,
					id_fermentasi: dataDetailTambahPenjemuran.id_fermentasi,
					id_sorting: dataDetailTambahPenjemuran.id_sorting,
					id_penjemuran: dataDetailTambahPenjemuran.id_penjemuran,
					berat_awal_proses: dataDetailTambahPenjemuran.berat_awal_penjemuran,
					tanggal_awal_proses:
						dataDetailTambahPenjemuran.tanggal_awal_penjemuran,
					tanggal_akhir_proses:
						dataDetailTambahPenjemuran.tanggal_akhir_penjemuran,
					id_pengguna: Cookies.get('id_pengguna'),
				}),
			})
				.then(response => response.json())
				.then(response => {
					alert(response.pesan);
					setShowModalTambahPenjemuran(false);
					window.location.reload();
				});
		}
	};

	const handleTambahPenjemuranTanpaFermentasi = () => {
		if (
			parseInt(
				dataDetailTambahPenjemuranTanpaFermentasi.berat_awal_penjemuran
			) !== parseInt(dataDetailTambahPenjemuranTanpaFermentasi.berat_sorting)
		) {
			alert('Berat awal penjemuran tidak sama dengan berat sorting');
		} else {
			fetch(
				`${urlPost}pengolahan/jelek/tambahpenjemuranjelektanpafermentasi.php`,
				{
					method: 'POST',
					body: JSON.stringify({
						id_panen: dataDetailTambahPenjemuranTanpaFermentasi.id_panen,
						id_sorting: dataDetailTambahPenjemuranTanpaFermentasi.id_sorting,
						id_penjemuran:
							dataDetailTambahPenjemuranTanpaFermentasi.id_penjemuran,
						berat_awal_proses:
							dataDetailTambahPenjemuranTanpaFermentasi.berat_awal_penjemuran,
						tanggal_awal_proses:
							dataDetailTambahPenjemuranTanpaFermentasi.tanggal_awal_penjemuran,
						tanggal_akhir_proses:
							dataDetailTambahPenjemuranTanpaFermentasi.tanggal_akhir_penjemuran,
						id_pengguna: Cookies.get('id_pengguna'),
					}),
				}
			)
				.then(response => response.json())
				.then(response => {
					alert(response.pesan);
					setShowModalTambahPenjemuranTanpaFermentasi(false);
					window.location.reload();
				});
		}
	};

	const handleSelesaikanPenjemuran = () => {
		if (
			parseInt(dataDetailSelesaikanPenjemuran.berat_akhir_penjemuran) >=
			parseInt(dataDetailSelesaikanPenjemuran.berat_awal_penjemuran)
		) {
			alert(
				'Berat akhir penjemuran tidak boleh lebih besar dari berat awal penjemuran'
			);
		} else {
			if (window.confirm('Apakah anda yakin ingin menyelesaikan penjemuran?')) {
				fetch(`${urlPost}pengolahan/jelek/selesaikanpenjemuranjelek.php`, {
					method: 'POST',
					body: JSON.stringify({
						id_penjemuran: dataDetailSelesaikanPenjemuran.id_penjemuran,
						berat_akhir_proses:
							dataDetailSelesaikanPenjemuran.berat_akhir_penjemuran,
						tanggal_akhir_proses:
							dataDetailSelesaikanPenjemuran.tanggal_akhir_penjemuran,
						id_pengguna: Cookies.get('id_pengguna'),
					}),
				})
					.then(response => response.json())
					.then(response => {
						alert(response.pesan);
						setShowModalSelesaikanPenjemuran(false);
						window.location.reload();
					});
			}
		}
	};

	const handleUpdatePenjemuran = () => {
		if (
			parseInt(dataDetailUpdatePenjemuran.berat_akhir_penjemuran) >
			parseInt(dataDetailUpdatePenjemuran.berat_awal_penjemuran)
		) {
			alert(
				'Berat akhir penjemuran tidak boleh lebih besar dari berat awal penjemuran'
			);
		} else {
			fetch(`${urlPost}pengolahan/jelek/editpenjemuranjelek.php`, {
				method: 'POST',
				body: JSON.stringify({
					id_penjemuran: dataDetailUpdatePenjemuran.id_penjemuran,
					berat_akhir_proses: dataDetailUpdatePenjemuran.berat_akhir_penjemuran,
					tanggal_akhir_proses:
						dataDetailUpdatePenjemuran.tanggal_akhir_penjemuran,
					id_pengguna: Cookies.get('id_pengguna'),
				}),
			})
				.then(response => response.json())
				.then(response => {
					alert(response.pesan);
					setShowModalUpdatePenjemuran(false);
					window.location.reload();
				});
		}
	};

	return (
		<>
			<Modal
				show={showModalDetail}
				onHide={() => setShowModalDetail(false)}
				size='xl'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Detail pengolahan ID Sorting: {dataDetail.id_sorting} </div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='my-2'>
						<Table
							striped
							bordered
							hover
							className='text-center'
							responsive='xl'>
							<thead>
								<tr>
									<th className='align-middle'>ID Sorting</th>
									<th className='align-middle'>Berat sorting</th>
									<th className='align-middle'>Tanggal sorting</th>
									<th className='align-middle'>Pengelola</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='align-middle'>
										{dataDetail.id_sorting == null
											? 'Tidak ada id'
											: dataDetail.id_sorting}
									</td>
									<td className='align-middle'>
										{dataDetail.berat_sorting == null
											? 'Tidak ada berat'
											: dataDetail.berat_sorting + ' Kg'}
									</td>
									<td className='align-middle'>
										{dataDetail.tanggal_sorting == null
											? 'Tidak ada tanggal'
											: dataDetail.tanggal_sorting}
									</td>
									<td className='align-middle'>
										{dataDetail.pengolah_sorting == null
											? '-'
											: dataDetail.pengolah_sorting}
									</td>
								</tr>
							</tbody>
						</Table>
						<Table
							striped
							bordered
							hover
							className='text-center'
							responsive='xl'>
							<thead>
								<tr>
									<th className='align-middle'>ID Fermentasi</th>
									<th className='align-middle'>Tanggal awal fermentasi</th>
									<th className='align-middle'>Berat awal fermentasi</th>
									<th className='align-middle'>Tanggal akhir fermentasi</th>
									<th className='align-middle'>Berat akhir fermentasi</th>
									<th className='align-middle'>Pengelola</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? 'Tidak difermentasi'
											: dataDetail.id_fermentasi == null
											? 'Belum difermentasi'
											: dataDetail.id_fermentasi}
									</td>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? 'Tidak difermentasi'
											: dataDetail.tanggal_awal_fermentasi == null
											? 'Belum difermentasi'
											: dataDetail.tanggal_awal_fermentasi}
									</td>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? 'Tidak difermentasi'
											: dataDetail.berat_awal_fermentasi == null
											? 'Belum difermentasi'
											: dataDetail.berat_awal_fermentasi + ' Kg'}
									</td>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? 'Tidak difermentasi'
											: dataDetail.tanggal_akhir_fermentasi == null
											? 'Belum selesai difermentasi'
											: dataDetail.tanggal_akhir_fermentasi}
									</td>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? 'Tidak difermentasi'
											: dataDetail.berat_akhir_fermentasi == null
											? 'Belum selesai difermentasi'
											: dataDetail.berat_akhir_fermentasi + ' Kg'}
									</td>
									<td className='align-middle'>
										{dataDetail.id_fermentasi == null &&
										dataDetail.id_penjemuran !== null
											? '-'
											: dataDetail.pengolah_fermentasi == null
											? '-'
											: dataDetail.pengolah_fermentasi}
									</td>
									<td className='align-middle'>
										{dataDetail.berat_awal_fermentasi == null ? (
											<Button
												variant='outline-primary'
												className='btn-sm'
												onClick={() => {
													setShowModalTambahFermentasi(true);
													setDataDetailTambahFermentasi(dataDetail);
												}}>
												Tambah Fermentasi
											</Button>
										) : dataDetail.berat_awal_fermentasi !== null &&
										  dataDetail.berat_akhir_fermentasi == null ? (
											<Button
												variant='outline-warning'
												className='btn-sm'
												onClick={() => {
													setShowModalSelesaikanFermentasi(true);
													setDataDetailSelesaikanFermentasi(dataDetail);
												}}>
												Selesaikan Proses
											</Button>
										) : dataDetail.berat_awal_penjemuran !== null ? (
											<></>
										) : (
											<Button
												variant='outline-info'
												className='btn-sm'
												onClick={() => {
													setShowModalUpdateFermentasi(true);
													setDataDetailUpdateFermentasi(dataDetail);
												}}>
												Edit
											</Button>
										)}
									</td>
								</tr>
							</tbody>
						</Table>

						<Table
							striped
							bordered
							hover
							className='text-center'
							responsive='xl'>
							<thead>
								<tr>
									<th className='align-middle'>ID Penjemuran</th>
									<th className='align-middle'>Tanggal awal penjemuran</th>
									<th className='align-middle'>Berat awal penjemuran</th>
									<th className='align-middle'>Tanggal akhir penjemuran</th>
									<th className='align-middle'>Berat akhir penjemuran</th>
									<th className='align-middle'>Pengelola</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='align-middle'>
										{dataDetail.id_penjemuran == null
											? 'Belum dijemur'
											: dataDetail.id_penjemuran}
									</td>
									<td className='align-middle'>
										{dataDetail.tanggal_awal_penjemuran == null
											? 'Belum dijemur'
											: dataDetail.tanggal_awal_penjemuran}
									</td>
									<td className='align-middle'>
										{dataDetail.berat_awal_penjemuran == null
											? 'Belum dijemur'
											: dataDetail.berat_awal_penjemuran + ' Kg'}
									</td>
									<td className='align-middle'>
										{dataDetail.tanggal_akhir_penjemuran == null
											? 'Belum selesai dijemur'
											: dataDetail.tanggal_akhir_penjemuran}
									</td>
									<td className='align-middle'>
										{dataDetail.berat_akhir_penjemuran == null
											? 'Belum selesai dijemur'
											: dataDetail.berat_akhir_penjemuran + ' Kg'}
									</td>
									<td className='align-middle'>
										{dataDetail.pengolah_penjemuran == null
											? '-'
											: dataDetail.pengolah_penjemuran}
									</td>
									<td className='align-middle'>
										{dataDetail.berat_awal_penjemuran == null ? (
											<Button
												variant='outline-success'
												className='btn-sm'
												onClick={() => {
													if (
														dataDetail.berat_awal_fermentasi !== null &&
														dataDetail.berat_akhir_fermentasi == null
													) {
														alert('Proses fermentasi belum selesai');
													} else if (
														dataDetail.berat_awal_fermentasi == null &&
														dataDetail.berat_akhir_fermentasi == null
													) {
														const confirmDelete = window.confirm(
															`Anda yakin ingin mulai penjemuran kopi tanpa fermentasi?`
														);
														if (confirmDelete) {
															setShowModalTambahPenjemuranTanpaFermentasi(true);
															setDataDetailTambahPenjemuranTanpaFermentasi(
																dataDetail
															);
														}
													} else {
														setShowModalTambahPenjemuran(true);
														setDataDetailTambahPenjemuran(dataDetail);
													}
												}}>
												Tambah Penjemuran
											</Button>
										) : (dataDetail.berat_awal_penjemuran !== null &&
												dataDetail.berat_akhir_penjemuran) == null ? (
											<Button
												variant='outline-warning'
												className='btn-sm'
												onClick={() => {
													setShowModalSelesaikanPenjemuran(true);
													setDataDetailSelesaikanPenjemuran(dataDetail);
												}}>
												Selesaikan Penjemuran
											</Button>
										) : (
											<Button
												variant='outline-info'
												className='btn-sm'
												onClick={() => {
													setShowModalUpdatePenjemuran(true);
													setDataDetailUpdatePenjemuran(dataDetail);
												}}>
												Edit
											</Button>
										)}
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal.Body>
			</Modal>

			{/* Tambah data fermentasi baru */}
			<Modal
				show={showModalTambahFermentasi}
				onHide={() => setShowModalTambahFermentasi(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Tambah Data Pengolahan Fermentasi ID Sorting :{' '}
							{dataDetailTambahFermentasi.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleTambahFermentasi();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Fermentasi</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Fermentasi'
													defaultValue={
														dataDetailTambahFermentasi.id_fermentasi
													}
													onChange={e => {
														setDataDetailTambahFermentasi({
															...dataDetailTambahFermentasi,
															id_fermentasi: e.target.value,
														});
													}}
												/>
												<Form.Text className='text-muted'>
													ID otomatis terbuat jika memasukkan tanggal dulu.
												</Form.Text>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai fermentasi'
													type='date'
													defaultValue={
														dataDetailTambahFermentasi.tanggal_awal_fermentasi
													}
													onChange={e => {
														setDataDetailTambahFermentasi({
															...dataDetailTambahFermentasi,
															id_fermentasi:
																'F' +
																//remove - from date
																e.target.value.replace(/-/g, '') +
																'STD',
															tanggal_awal_fermentasi: e.target.value,
														});
													}}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir fermentasi'
													type='date'
													defaultValue={
														dataDetailTambahFermentasi.tanggal_akhir_fermentasi
													}
													onChange={e =>
														setDataDetailTambahFermentasi({
															...dataDetailTambahFermentasi,
															tanggal_akhir_fermentasi: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal fermentasi'
													defaultValue={
														dataDetailTambahFermentasi.berat_awal_fermentasi
													}
													onChange={e =>
														setDataDetailTambahFermentasi({
															...dataDetailTambahFermentasi,
															berat_awal_fermentasi: e.target.value,
														})
													}
												/>
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
													setShowModalTambahFermentasi(false);
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailTambahFermentasi.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{dataDetailTambahFermentasi.berat_sorting} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>{dataDetailTambahFermentasi.tanggal_sorting}</td>
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

			{/* Selesaikan fermentasi */}
			<Modal
				show={showModalSelesaikanFermentasi}
				onHide={() => setShowModalSelesaikanFermentasi(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Selesaikan Pengolahan Fermentasi ID Sorting :{' '}
							{dataDetailSelesaikanFermentasi.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleSelesaikanFermentasi();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Fermentasi</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Fermentasi'
													value={dataDetailSelesaikanFermentasi.id_fermentasi}
												/>
												<Form.Text className='text-muted'>
													Data tidak dapat diubah, jika ingin diubah silahkan
													hapus data fermentasi.
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal fermentasi'
													value={
														dataDetailSelesaikanFermentasi.berat_awal_fermentasi
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai fermentasi'
													type='date'
													value={
														dataDetailSelesaikanFermentasi.tanggal_awal_fermentasi
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat akhir(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat akhir fermentasi'
													defaultValue={
														dataDetailSelesaikanFermentasi.berat_akhir_fermentasi
													}
													onChange={e =>
														setDataDetailSelesaikanFermentasi({
															...dataDetailSelesaikanFermentasi,
															berat_akhir_fermentasi: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir fermentasi'
													type='date'
													defaultValue={
														dataDetailSelesaikanFermentasi.tanggal_akhir_fermentasi
													}
													onChange={e =>
														setDataDetailSelesaikanFermentasi({
															...dataDetailSelesaikanFermentasi,
															tanggal_akhir_fermentasi: e.target.value,
														})
													}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='row d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											<Button
												variant='outline-success'
												type='submit'
												className='px-4'>
												Selesaikan Fermentasi
											</Button>
											<Button
												variant='outline-danger'
												className='px-4 ms-5'
												onClick={() => {
													if (
														window.confirm(
															'Apakah anda yakin ingin menghapus fermentasi?'
														)
													) {
														fetch(
															`${urlPost}pengolahan/jelek/hapusfermentasi.php`,
															{
																method: 'POST',
																body: JSON.stringify({
																	id_fermentasi:
																		dataDetailSelesaikanFermentasi.id_fermentasi,
																	id_pengguna: Cookies.get('id_pengguna'),
																}),
															}
														)
															.then(response => response.json())
															.then(response => {
																alert(response.pesan);
																window.location.reload();
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailSelesaikanFermentasi.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>
														{dataDetailSelesaikanFermentasi.berat_sorting} kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>
														{dataDetailSelesaikanFermentasi.tanggal_sorting}
													</td>
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

			{/* Edit fermentasi */}
			<Modal
				show={showModalUpdateFermentasi}
				onHide={() => setShowModalUpdateFermentasi(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Edit Pengolahan Fermentasi ID Sorting :{' '}
							{dataDetailUpdateFermentasi.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleUpdateFermentasi();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Fermentasi</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Fermentasi'
													value={dataDetailUpdateFermentasi.id_fermentasi}
												/>
												<Form.Text className='text-muted'>
													Data awal proses tidak dapat diubah, hanya dapat
													mengedit data akhir pengolahan fermentasi.
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal fermentasi'
													value={
														dataDetailUpdateFermentasi.berat_awal_fermentasi
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai fermentasi'
													type='date'
													value={
														dataDetailUpdateFermentasi.tanggal_awal_fermentasi
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat akhir(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat akhir fermentasi'
													defaultValue={
														dataDetailUpdateFermentasi.berat_akhir_fermentasi
													}
													onChange={e =>
														setDataDetailUpdateFermentasi({
															...dataDetailUpdateFermentasi,
															berat_akhir_fermentasi: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir fermentasi'
													type='date'
													defaultValue={
														dataDetailUpdateFermentasi.tanggal_akhir_fermentasi
													}
													onChange={e =>
														setDataDetailUpdateFermentasi({
															...dataDetailUpdateFermentasi,
															tanggal_akhir_fermentasi: e.target.value,
														})
													}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='row d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											<Button
												variant='outline-success'
												type='submit'
												className='px-4'>
												Edit & Simpan
											</Button>
											<Button
												variant='outline-danger'
												className='px-4 ms-5'
												onClick={() => {
													if (
														window.confirm(
															'Apakah anda yakin ingin menghapus fermentasi?'
														)
													) {
														fetch(
															`${urlPost}pengolahan/jelek/hapusfermentasi.php`,
															{
																method: 'POST',
																body: JSON.stringify({
																	id_fermentasi:
																		dataDetailUpdateFermentasi.id_fermentasi,
																	id_pengguna: Cookies.get('id_pengguna'),
																}),
															}
														)
															.then(response => response.json())
															.then(response => {
																alert(response.pesan);
																window.location.reload();
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailUpdateFermentasi.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{dataDetailUpdateFermentasi.berat_sorting} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>{dataDetailUpdateFermentasi.tanggal_sorting}</td>
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

			{/* Tambah data penjemuran baru */}
			<Modal
				show={showModalTambahPenjemuran}
				onHide={() => setShowModalTambahPenjemuran(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Tambah Data Penjemuran ID Sorting :{' '}
							{dataDetailTambahPenjemuran.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleTambahPenjemuran();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Penjemuran</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Penjemuran'
													defaultValue={
														dataDetailTambahPenjemuran.id_penjemuran
													}
													onChange={e => {
														setDataDetailTambahPenjemuran({
															...dataDetailTambahPenjemuran,
															id_penjemuran: e.target.value,
														});
													}}
												/>
												<Form.Text className='text-muted'>
													ID otomatis terbuat jika memasukkan tanggal dulu.
												</Form.Text>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai penjemuran'
													type='date'
													defaultValue={
														dataDetailTambahPenjemuran.tanggal_awal_penjemuran
													}
													onChange={e => {
														setDataDetailTambahPenjemuran({
															...dataDetailTambahPenjemuran,
															id_penjemuran:
																'PEN' +
																//remove - from date
																e.target.value.replace(/-/g, '') +
																'STD',
															tanggal_awal_penjemuran: e.target.value,
														});
													}}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir penjemuran'
													type='date'
													defaultValue={
														dataDetailTambahPenjemuran.tanggal_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailTambahPenjemuran({
															...dataDetailTambahPenjemuran,
															tanggal_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal penjemuran'
													defaultValue={
														dataDetailTambahPenjemuran.berat_awal_penjemuran
													}
													onChange={e =>
														setDataDetailTambahPenjemuran({
															...dataDetailTambahPenjemuran,
															berat_awal_penjemuran: e.target.value,
														})
													}
												/>
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
													setShowModalTambahPenjemuran(false);
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailTambahPenjemuran.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{dataDetailTambahPenjemuran.berat_sorting} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>{dataDetailTambahPenjemuran.tanggal_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>ID Fermentasi</th>
													<td>{dataDetailTambahPenjemuran.id_fermentasi}</td>
												</tr>
												<tr>
													<th scope='row'>Berat awal proses</th>
													<td>
														{dataDetailTambahPenjemuran.berat_awal_fermentasi}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal awal proses</th>
													<td>
														{dataDetailTambahPenjemuran.tanggal_awal_fermentasi}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat akhir proses</th>
													<td>
														{dataDetailTambahPenjemuran.berat_akhir_fermentasi}{' '}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal akhir proses</th>
													<td>
														{
															dataDetailTambahPenjemuran.tanggal_akhir_fermentasi
														}
													</td>
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

			{/* Tambah data penjemuran baru tanpa fermentasi */}
			<Modal
				show={showModalTambahPenjemuranTanpaFermentasi}
				onHide={() => setShowModalTambahPenjemuranTanpaFermentasi(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Tambah Data Penjemuran Tanpa Fermentasi <br /> ID Sorting :{' '}
							{dataDetailTambahPenjemuranTanpaFermentasi.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleTambahPenjemuranTanpaFermentasi();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Penjemuran</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Penjemuran'
													defaultValue={
														dataDetailTambahPenjemuranTanpaFermentasi.id_penjemuran
													}
													onChange={e => {
														setDataDetailTambahPenjemuranTanpaFermentasi({
															...dataDetailTambahPenjemuranTanpaFermentasi,
															id_penjemuran: e.target.value,
														});
													}}
												/>
												<Form.Text className='text-muted'>
													ID otomatis terbuat jika memasukkan tanggal dulu.
												</Form.Text>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai penjemuran'
													type='date'
													defaultValue={
														dataDetailTambahPenjemuranTanpaFermentasi.tanggal_awal_penjemuran
													}
													onChange={e => {
														setDataDetailTambahPenjemuranTanpaFermentasi({
															...dataDetailTambahPenjemuranTanpaFermentasi,
															id_penjemuran:
																'PEN' +
																//remove - from date
																e.target.value.replace(/-/g, '') +
																'STD',
															tanggal_awal_penjemuran: e.target.value,
														});
													}}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir penjemuran'
													type='date'
													defaultValue={
														dataDetailTambahPenjemuranTanpaFermentasi.tanggal_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailTambahPenjemuranTanpaFermentasi({
															...dataDetailTambahPenjemuranTanpaFermentasi,
															tanggal_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal penjemuran'
													defaultValue={
														dataDetailTambahPenjemuranTanpaFermentasi.berat_awal_penjemuran
													}
													onChange={e =>
														setDataDetailTambahPenjemuranTanpaFermentasi({
															...dataDetailTambahPenjemuranTanpaFermentasi,
															berat_awal_penjemuran: e.target.value,
														})
													}
												/>
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
													setShowModalTambahPenjemuranTanpaFermentasi(false);
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.id_sorting
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.berat_sorting
														}{' '}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.tanggal_sorting
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>ID Fermentasi</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.id_fermentasi
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat awal proses</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.berat_awal_fermentasi
														}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal awal proses</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.tanggal_awal_fermentasi
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat akhir proses</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.berat_akhir_fermentasi
														}{' '}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal akhir proses</th>
													<td>
														{
															dataDetailTambahPenjemuranTanpaFermentasi.tanggal_akhir_fermentasi
														}
													</td>
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

			{/* Selesaikan penjemuran */}
			<Modal
				show={showModalSelesaikanPenjemuran}
				onHide={() => setShowModalSelesaikanPenjemuran(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Selesaikan Pengolahan Penjemuran ID Sorting :{' '}
							{dataDetailSelesaikanPenjemuran.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleSelesaikanPenjemuran();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Penjemuran</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Penjemuran'
													value={dataDetailSelesaikanPenjemuran.id_penjemuran}
												/>
												<Form.Text className='text-muted'>
													Data tidak dapat diubah, jika ingin diubah silahkan
													hapus data penjemuran.
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal penjemuran'
													value={
														dataDetailSelesaikanPenjemuran.berat_awal_penjemuran
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai penjemuran'
													type='date'
													value={
														dataDetailSelesaikanPenjemuran.tanggal_awal_penjemuran
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat akhir(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat akhir penjemuran'
													defaultValue={
														dataDetailSelesaikanPenjemuran.berat_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailSelesaikanPenjemuran({
															...dataDetailSelesaikanPenjemuran,
															berat_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir fermentasi</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir penjemuran'
													type='date'
													defaultValue={
														dataDetailSelesaikanPenjemuran.tanggal_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailSelesaikanPenjemuran({
															...dataDetailSelesaikanPenjemuran,
															tanggal_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='row d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											<Button
												variant='outline-success'
												type='submit'
												className='px-4'>
												Selesaikan Penjemuran
											</Button>
											<Button
												variant='outline-danger'
												className='px-4 ms-5'
												onClick={() => {
													if (
														window.confirm(
															'Apakah anda yakin ingin menghapus penjemuran?'
														)
													) {
														fetch(
															`${urlPost}pengolahan/jelek/hapuspenjemuran.php`,
															{
																method: 'POST',
																body: JSON.stringify({
																	id_penjemuran:
																		dataDetailSelesaikanPenjemuran.id_penjemuran,
																	id_pengguna: Cookies.get('id_pengguna'),
																}),
															}
														)
															.then(response => response.json())
															.then(response => {
																alert(response.pesan);
																window.location.reload();
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailSelesaikanPenjemuran.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>
														{dataDetailSelesaikanPenjemuran.berat_sorting} kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>
														{dataDetailSelesaikanPenjemuran.tanggal_sorting}
													</td>
												</tr>
												<tr>
													<th scope='row'>ID Fermentasi</th>
													<td>
														{dataDetailSelesaikanPenjemuran.id_fermentasi}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat awal proses</th>
													<td>
														{
															dataDetailSelesaikanPenjemuran.berat_awal_fermentasi
														}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal awal proses</th>
													<td>
														{
															dataDetailSelesaikanPenjemuran.tanggal_awal_fermentasi
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat akhir proses</th>
													<td>
														{
															dataDetailSelesaikanPenjemuran.berat_akhir_fermentasi
														}{' '}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal akhir proses</th>
													<td>
														{
															dataDetailSelesaikanPenjemuran.tanggal_akhir_fermentasi
														}
													</td>
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

			{/* Edit penjemuran */}
			<Modal
				show={showModalUpdatePenjemuran}
				onHide={() => setShowModalUpdatePenjemuran(false)}
				size='lg'
				backdrop='static'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>
							Edit Pengolahan Penjemuran ID Sorting :{' '}
							{dataDetailUpdatePenjemuran.id_sorting}
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-6'>
							<div className='my-2'>
								<Form
									onSubmit={e => {
										e.preventDefault();
										handleUpdatePenjemuran();
									}}>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<Form.Group>
												<Form.Label>ID Penjemuran</Form.Label>
												<Form.Control
													type='text'
													placeholder='ID Penjemuran'
													value={dataDetailUpdatePenjemuran.id_penjemuran}
												/>
												<Form.Text className='text-muted'>
													Data awal proses tidak dapat diubah, hanya dapat
													mengedit data akhir pengolahan penjemuran.
												</Form.Text>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat awal(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat awal penjemuran'
													value={
														dataDetailUpdatePenjemuran.berat_awal_penjemuran
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal mulai penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal mulai penjemuran'
													type='date'
													value={
														dataDetailUpdatePenjemuran.tanggal_awal_penjemuran
													}
												/>
											</Form.Group>
											<Form.Group className='mt-2'>
												<Form.Label>Berat akhir(kg)</Form.Label>
												<Form.Control
													type='number'
													placeholder='Masukkkan berat akhir penjemuran'
													defaultValue={
														dataDetailUpdatePenjemuran.berat_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailUpdatePenjemuran({
															...dataDetailUpdatePenjemuran,
															berat_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='my-3'>
												<Form.Label>Tanggal akhir penjemuran</Form.Label>
												<Form.Control
													placeholder='Masukkkan tanggal akhir penjemuran'
													type='date'
													defaultValue={
														dataDetailUpdatePenjemuran.tanggal_akhir_penjemuran
													}
													onChange={e =>
														setDataDetailUpdatePenjemuran({
															...dataDetailUpdatePenjemuran,
															tanggal_akhir_penjemuran: e.target.value,
														})
													}
												/>
											</Form.Group>
										</div>
									</div>
									<div className='row d-flex justify-content-between mt-3'>
										<div className='w-auto'>
											<Button
												variant='outline-success'
												type='submit'
												className='px-4'>
												Edit & Simpan
											</Button>
											<Button
												variant='outline-danger'
												className='px-4 ms-5'
												onClick={() => {
													if (
														window.confirm(
															'Apakah anda yakin ingin menghapus penjemuran?'
														)
													) {
														fetch(
															`${urlPost}pengolahan/jelek/hapuspenjemuran.php`,
															{
																method: 'POST',
																body: JSON.stringify({
																	id_penjemuran:
																		dataDetailUpdatePenjemuran.id_penjemuran,
																}),
															}
														)
															.then(response => response.json())
															.then(response => {
																alert(response.pesan);
																window.location.reload();
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
									<h5 className='text-center'>Detail data sorting</h5>
									<div className='table-responsive'>
										<table className='table table-bordered'>
											<tbody>
												<tr>
													<th scope='row'>ID Sorting</th>
													<td>{dataDetailUpdatePenjemuran.id_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>Berat</th>
													<td>{dataDetailUpdatePenjemuran.berat_sorting} kg</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal sorting</th>
													<td>{dataDetailUpdatePenjemuran.tanggal_sorting}</td>
												</tr>
												<tr>
													<th scope='row'>ID Fermentasi</th>
													<td>{dataDetailUpdatePenjemuran.id_fermentasi}</td>
												</tr>
												<tr>
													<th scope='row'>Berat awal proses</th>
													<td>
														{dataDetailUpdatePenjemuran.berat_awal_fermentasi}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal awal proses</th>
													<td>
														{dataDetailUpdatePenjemuran.tanggal_awal_fermentasi}
													</td>
												</tr>
												<tr>
													<th scope='row'>Berat akhir proses</th>
													<td>
														{dataDetailUpdatePenjemuran.berat_akhir_fermentasi}{' '}
														kg
													</td>
												</tr>
												<tr>
													<th scope='row'>Tanggal akhir proses</th>
													<td>
														{
															dataDetailUpdatePenjemuran.tanggal_akhir_fermentasi
														}
													</td>
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

			<div
				style={{
					overflowY: 'scroll',
					overflowX: 'scroll',
					width: '100%',
					maxHeight: '350px',
					marginBottom: '1%',
				}}>
				<Table striped bordered hover className='text-center' responsive='xl'>
					<thead>
						<tr>
							<th className='align-middle'>ID Sorting</th>
							<th className='align-middle'>Berat sorting</th>
							<th className='align-middle'>Tanggal sorting</th>
							<th className='align-middle'>ID Fermentasi</th>
							<th className='align-middle'>Berat awal fermentasi</th>
							<th className='align-middle'>Berat akhir fermentasi</th>
							<th className='align-middle'>ID Penjemuran</th>
							<th className='align-middle'>Berat awal penjemuran</th>
							<th className='align-middle'>Berat akhir penjemuran</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.map(item => {
							return (
								<tr key={item.id_sorting}>
									<td className='align-middle'>
										{item.id_sorting == null ? 'Tidak ada id' : item.id_sorting}
									</td>
									<td className='align-middle'>
										{item.berat_sorting == null
											? 'Tidak ada berat'
											: item.berat_sorting + ' Kg'}
									</td>
									<td className='align-middle'>
										{item.tanggal_sorting == null
											? 'Tidak ada tanggal'
											: item.tanggal_sorting}
									</td>
									<td className='align-middle'>
										{item.id_fermentasi == null && item.id_penjemuran !== null
											? 'Tidak difermentasi'
											: item.id_fermentasi == null
											? 'Belum difermentasi'
											: item.id_fermentasi}
									</td>
									<td className='align-middle'>
										{item.id_fermentasi == null && item.id_penjemuran !== null
											? 'Tidak difermentasi'
											: item.berat_awal_fermentasi == null
											? 'Belum difermentasi'
											: item.berat_awal_fermentasi + ' Kg'}
									</td>
									<td className='align-middle'>
										{item.id_fermentasi == null && item.id_penjemuran !== null
											? 'Tidak difermentasi'
											: item.berat_akhir_fermentasi == null
											? 'Belum selesai difermentasi'
											: item.berat_akhir_fermentasi + ' Kg'}
									</td>
									<td className='align-middle'>
										{item.id_penjemuran == null
											? 'Belum dijemur'
											: item.id_penjemuran}
									</td>
									<td className='align-middle'>
										{item.berat_awal_penjemuran == null
											? 'Belum dijemur'
											: item.berat_awal_penjemuran + ' Kg'}
									</td>
									<td className='align-middle'>
										{item.berat_akhir_penjemuran == null
											? 'Belum selesai dijemur'
											: item.berat_akhir_penjemuran + ' Kg'}
									</td>
									<td className='align-middle'>
										<Button
											variant='outline-success'
											className='btn-sm'
											onClick={() => {
												setDataDetail(item);
												setShowModalDetail(true);
											}}>
											Detail
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</>
	);
};
