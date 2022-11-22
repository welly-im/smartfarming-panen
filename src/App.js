import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from '../src/pages/login';
import Dashboard from '../src/pages/dashboard/dashboard';
import { Panen } from './pages/panen/panen';
import { Sorting } from './pages/sorting/sorting';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route exact path='/' element={<Login />} />
					{Cookies.get('jabatan') === '1' ? (
						<>
							<Route exact path='/dashboard' element={<Dashboard />} />
							<Route exact path='/panen' element={<Panen />} />
							<Route exact path='/sorting' element={<Sorting />} />
						</>
					) : (
						<Route path='/logindulu' element={<LoginDulu />} />
					)}
					<Route exact path='/salah' element={<Salah />} />
					<Route path='*' element={<Login />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

function Salah() {
	return <h2>Tidak boleh masuk</h2>;
}
function LoginDulu() {
	return <h2>Anda harus login!</h2>;
}
export default App;
