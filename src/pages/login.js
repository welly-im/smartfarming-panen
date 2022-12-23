import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { apiPost } from '../data/api';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import PropagateLoader from 'react-spinners/PropagateLoader';

export default function Login() {
	let navigate = useNavigate();
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const formLogin = new FormData();
	formLogin.append('nama_pengguna', username);
	formLogin.append('password', password);

	const handleSubmit = () => {
		setLoading(true);
		fetch(`${urlPost}login.php`, {
			method: 'POST',
			body: formLogin,
		})
			.then(response => response.json())
			.then(response => {
				Cookies.set('nama_pengguna', response.nama_pengguna);
				Cookies.set('id_pengguna', response.id_pengguna);
				Cookies.set('jabatan', response.jabatan);
				if (response.jabatan === '1') {
					setLoading(false);
					navigate('/dashboard');
					window.location.reload();
				} else {
					navigate('/salah');
				}
			})
			.catch(err => {
				setLoading(false);
				alert(err);
				console.log(err);
			});
	};

	return (
		//create simple login page with react-bootstrap
		<div className='container'>
			<div className='d-flex flex-column justify-content-center mt-5'>
				<Card
					className='container shadow p-3 mb-5 bg-white rounded'
					style={{ width: '30rem' }}>
					<div className='d-flex justify-content-center mt-3'>
						<Card.Img
							variant='top'
							src={require('./../assets/logo.png')}
							style={{ width: '5rem' }}
						/>
					</div>
					<Card.Body className='d-flex justify-content-center'>
						<Card.Title className='text-center'>
							Sistem Informasi Smart Farming <br />
							Pasca Panen
						</Card.Title>
					</Card.Body>
					<Form
						onSubmit={e => {
							e.preventDefault();
							handleSubmit();
						}}>
						<Form.Group controlId='formUsername'>
							<Form.Label>Nama pengguna</Form.Label>
							<Form.Control
								type='text'
								placeholder='Masukkan Nama Pengguna'
								onChange={e => {
									setUsername(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPassword' className='mt-3'>
							<Form.Label>Kata sandi</Form.Label>
							<Form.Control
								type='password'
								placeholder='Masukkan Kata Sandi'
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
						</Form.Group>
						{loading ? (
							<div className='py-5 h-auto text-center d-block'>
								<PropagateLoader
									color={'#005A04 '}
									loading={loading}
									size={30}
									aria-label='Loading Spinner'
									data-testid='loader'
								/>
							</div>
						) : (
							<Button variant='primary' type='submit' className='mt-4 w-100'>
								Masuk
							</Button>
						)}
					</Form>
				</Card>
			</div>
		</div>
	);
}
