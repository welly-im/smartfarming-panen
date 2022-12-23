import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from '../src/pages/login';
import Dashboard from '../src/pages/dashboard/dashboard';
import { Panen } from './pages/panen/panen';
import { Sorting } from './pages/sorting/sorting';
import { Pengolahan } from './pages/pengolahan/pengolahan';
import { Stok } from './pages/stok/stok';
import { DashboardMaster } from './pages/master/dashboardmaster';
import { Cuaca } from './pages/cuaca/cuaca';
import { Penjualan } from './pages/penjualan/penjualan';

function App() {
	return (
		<BrowserRouter>
			<>
				<Routes>
					<Route exact path='/' element={<Login />} />
					{Cookies.get('jabatan') === '1' ? (
						<>
							<Route exact path='/dashboard' element={<Dashboard />} />
							<Route exact path='/panen' element={<Panen />} />
							<Route exact path='/sorting' element={<Sorting />} />
							<Route exact path='/pengolahan' element={<Pengolahan />} />
							<Route exact path='/stok' element={<Stok />} />
							<Route exact path='/masterdata' element={<DashboardMaster />} />
							<Route exact path='/cuaca' element={<Cuaca />} />
							<Route exact path='/penjualan' element={<Penjualan />} />
						</>
					) : (
						<Route path='/logindulu' element={<LoginDulu />} />
					)}
					<Route exact path='/salah' element={<Salah />} />
					<Route path='*' element={<Login />} />
				</Routes>
			</>
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
