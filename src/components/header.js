import { useState } from 'react';
import './header.css';
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	let navigate = useNavigate();
	const [isOpen, setIsopen] = useState(false);
	const [pilihPengolahan, setPilihPengolahan] = useState(false);

	const ToggleSidebar = () => {
		isOpen === true ? setIsopen(false) : setIsopen(true);
	};

	const handleLogout = () => {
		Cookies.remove('nama_pengguna');
		Cookies.remove('id_pengguna');
		Cookies.remove('jabatan');
		navigate('/');
	};

	return (
		<>
			{/* <Modal
				show={pilihPengolahan}
				onHide={() => setPilihPengolahan(false)}
				size='md'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<div>Pilih Jenis Sortingan</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row px-3'>
						<div className='col-6'>
							<Button
								variant='outline-success'
								className='w-100'
								onClick={() => navigate('/pengolahanpremium')}>
								Kopi Sortingan Premium
							</Button>
						</div>
						<div className='col-6'>
							<Button
								variant='outline-danger'
								className='w-100'
								onClick={() => navigate('/pengolahanstandard')}>
								Kopi Sortingan Standard
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal> */}
			<div className='container-fluid mt-3'>
				<nav className='navbar navbar-expand-lg navbar-light bg-white shadow-md'>
					<div className='container-fluid py-2 px-4'>
						<div className='form-inline ml-auto mar'>
							<Button className='btn btn-primary' onClick={ToggleSidebar}>
								<i className='fa fa-bars'></i>
							</Button>
						</div>
						<a className='navbar-brand text-primary mr-0'>
							{' '}
							Halo,{' '}
							{Cookies.get('nama_pengguna').charAt(0).toUpperCase() +
								Cookies.get('nama_pengguna').slice(1)}
							!
						</a>
					</div>
				</nav>
				<div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
					<div className='sd-header mt-2'>
						<h4 className='mb-0'>Menu</h4>
						<Button className='btn btn-primary' onClick={ToggleSidebar}>
							<i className='fa fa-times'></i>
						</Button>
					</div>
					<div className='sd-body'>
						<ul>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/dashboard');
									}}>
									<i className='fa fa-home' aria-hidden='true'></i> Dashboard
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/panen');
									}}>
									<i className='fa fa-folder-open-o' aria-hidden='true'></i>{' '}
									Data Panen Kopi
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/sorting');
									}}>
									<i className='fa fa-balance-scale' aria-hidden='true'></i>{' '}
									Data Sortingan
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/pengolahan');
									}}>
									<i className='fa fa-folder-open-o' aria-hidden='true'></i>{' '}
									Data Pengolahan Kopi
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/stok');
									}}>
									<i className='fa fa-folder-open-o' aria-hidden='true'></i>{' '}
									Data Stok Kopi
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/penjualan');
									}}>
									<i className='fa fa-folder-open-o' aria-hidden='true'></i>{' '}
									Data Penjualan Kopi
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									onClick={() => {
										navigate('/masterdata');
									}}>
									<i className='fa fa-book' aria-hidden='true'></i> Master Data
								</a>
							</li>
							<li className='my-2'>
								<a
									className='sd-link'
									target='_blank'
									onClick={() => {
										navigate('/cuaca');
									}}
									//href='https://www.timeanddate.com/weather/@8174582/historic'
								>
									{' '}
									<i className='fa fa-info-circle' aria-hidden='true'></i> Info
									Cuaca
								</a>
							</li>
						</ul>
						<ul>
							<li className='mt-5'>
								<a
									className='sd-link-danger text-center'
									onClick={handleLogout}>
									Keluar Akun{' '}
									<i className='fa fa-sign-out' aria-hidden='true'></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`}
					onClick={ToggleSidebar}></div>
			</div>
		</>
	);
};
