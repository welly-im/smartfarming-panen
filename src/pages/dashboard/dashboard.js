import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import axios from 'axios';
import { apiGet } from '../../data/api';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
	let navigate = useNavigate();
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [data, setData] = useState({
		total_berat: '0',
		total_sorting_bagus: '0',
		total_sorting_jelek: '0',
		total_berat_fermentasi: '0',
		total_berat_penjemuran: '0',
		total_berat_stok: '0',
		total_berat_kopi_tanpa_kulit_grade_1: '0',
		total_berat_kopi_tanpa_kulit_grade_2: '0',
		total_berat_kopi_tanpa_kulit_grade_3: '0',
	});

	useEffect(() => {
		axios
			.get(`${urlGet}infodashboard`)
			.then(res => {
				setData(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div>
				<Header />
				{data.total_berat !== '0' ? (
					<>
						<div className='container my-4'>
							<div className='row'>
								<div className='col-md-4'>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<h5 className='card-title m-0'>Kopi Dipanen</h5>
											<p className='card-text'>Hasil panen kopi (2022)</p>
											<h1 className='card-text'>
												{data && data.total_berat !== null ? (
													<>
														{data.total_berat
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
														kg
													</>
												) : (
													<>0 kg</>
												)}
											</h1>
											<div className='row'>
												<divs>
													<a
														className='btn btn-secondary'
														onClick={() => {
															navigate('/panen');
														}}>
														Lihat detail
													</a>
												</divs>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-4'>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<h5 className='card-title m-0'>Kopi Sorting Bagus</h5>
											<p className='card-text'>Hasil sortingan bagus</p>
											<h1 className='card-text'>
												{data && data.total_sorting_bagus !== null ? (
													<>
														{data.total_sorting_bagus
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
														kg
													</>
												) : (
													<>0 kg</>
												)}
											</h1>
											<div className='row'>
												<div>
													<a
														className='btn btn-success'
														onClick={() => {
															navigate('/sorting');
														}}>
														Lihat Detail
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-4'>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<h5 className='card-title m-0'>Kopi Sorting Jelek</h5>
											<p className='card-text'>Hasil sortingan jelek</p>
											<h1 className='card-text'>
												{data && data.total_sorting_jelek !== null ? (
													<>
														{data.total_sorting_jelek
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
														kg
													</>
												) : (
													<>0 kg</>
												)}
											</h1>
											<div className='row'>
												<div>
													<a
														className='btn btn-danger'
														onClick={() => {
															navigate('/sorting');
														}}>
														Lihat Detail
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-md-12'>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<div className='row'>
												<div className='col-md-3'>
													<h5 className='card-title m-0'>Stok kopi</h5>
													<p className='card-text'>
														Stok kopi yang tersedia saat ini
													</p>
													<h1 className='card-text'>
														{data && data.total_berat_stok !== null ? (
															<>
																{data.total_berat_stok
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
																kg
															</>
														) : (
															<> 0 kg</>
														)}
													</h1>
													<div className='row'>
														<div>
															<a className='btn btn-success'>Lihat Detail</a>
														</div>
													</div>
												</div>
												<div className='col-md-3'>
													<div className='card h-100 text-center'>
														<div className='card-body shadow bg-white rounded'>
															<h5 className='card-title m-0'>Grade A</h5>
															<h1 className='card-text mt-4'>
																{data ? (
																	<>
																		{data.total_berat_kopi_tanpa_kulit_grade_1
																			.toString()
																			.replace(
																				/\B(?=(\d{3})+(?!\d))/g,
																				'.'
																			)}{' '}
																		kg{' '}
																	</>
																) : (
																	<>0 kg</>
																)}
															</h1>
														</div>
													</div>
												</div>
												<div className='col-md-3'>
													<div className='card h-100 text-center'>
														<div className='card-body shadow bg-white rounded'>
															<h5 className='card-title m-0'>Grade B</h5>
															<h1 className='card-text mt-4'>
																{data ? (
																	<>
																		{data.total_berat_kopi_tanpa_kulit_grade_2
																			.toString()
																			.replace(
																				/\B(?=(\d{3})+(?!\d))/g,
																				'.'
																			)}{' '}
																		kg{' '}
																	</>
																) : (
																	<>0 kg</>
																)}
															</h1>
														</div>
													</div>
												</div>
												<div className='col-md-3'>
													<div className='card h-100 text-center'>
														<div className='card-body shadow bg-white rounded'>
															<h5 className='card-title m-0'>Grade C</h5>
															<h1 className='card-text mt-4'>
																{data ? (
																	<>
																		{data.total_berat_kopi_tanpa_kulit_grade_3
																			.toString()
																			.replace(
																				/\B(?=(\d{3})+(?!\d))/g,
																				'.'
																			)}{' '}
																		kg{' '}
																	</>
																) : (
																	<>0 kg</>
																)}
															</h1>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-md-12'>
									<div className='card'>
										<div className='card-body shadow bg-white rounded'>
											<div className='row'>
												<div className='col-md-4'>
													<h5 className='card-title m-0'>Kopi dalam proses</h5>
													<p className='card-text'>
														Kopi yang sedang diproses saat ini
													</p>
													<h1 className='card-text'>
														{data &&
														data.total_berat_fermentasi !== null &&
														data.total_berat_penjemuran !== null ? (
															<>
																{(
																	parseInt(data.total_berat_fermentasi) +
																	parseInt(data.total_berat_penjemuran)
																)
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
																kg
															</>
														) : data.total_berat_fermentasi !== null ? (
															<>
																{parseInt(data.total_berat_fermentasi)
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
																kg
															</>
														) : data.total_berat_penjemuran !== null ? (
															<>
																{parseInt(data.total_berat_penjemuran)
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
																kg
															</>
														) : (
															<>0 kg</>
														)}
													</h1>
													<div className='row'>
														<div>
															<a className='btn btn-success'>Lihat Detail</a>
														</div>
													</div>
												</div>
												<div className='col-md-4'>
													<div className='card h-100 text-center'>
														<div className='card-body shadow bg-white rounded'>
															<h5 className='card-title m-0'>Fermentasi</h5>
															<h1 className='card-text mt-4'>
																{data &&
																data.total_berat_fermentasi !== null ? (
																	<>
																		{data.total_berat_fermentasi
																			.toString()
																			.replace(
																				/\B(?=(\d{3})+(?!\d))/g,
																				'.'
																			)}{' '}
																		kg
																	</>
																) : (
																	<>0 kg</>
																)}
															</h1>
														</div>
													</div>
												</div>
												<div className='col-md-4'>
													<div className='card h-100 text-center'>
														<div className='card-body shadow bg-white rounded'>
															<h5 className='card-title m-0'>Penjemuran</h5>
															<h1 className='card-text mt-4'>
																{data &&
																data.total_berat_penjemuran !== null ? (
																	<>
																		{data.total_berat_penjemuran
																			.toString()
																			.replace(
																				/\B(?=(\d{3})+(?!\d))/g,
																				'.'
																			)}{' '}
																		kg
																	</>
																) : (
																	<>0 kg</>
																)}
															</h1>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						<h2 className='mt-5 w-100 d-flex justify-content-center'>
							Tidak ada data...
						</h2>
					</>
				)}
			</div>
		</>
	);
}
