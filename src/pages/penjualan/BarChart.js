import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../data/api';
import { useAtom } from 'jotai';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Data penjualan per tahun',
		},
	},
};

export const BarChart = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [penjualanTahun, setPenjualanTahun] = useState([]);

	useEffect(() => {
		fetch(`${urlGet}graphpenjualanperyear`)
			.then(response => response.json())
			.then(response => {
				setPenjualanTahun(response);
				console.log(response);
			});
	}, []);

	const labels = penjualanTahun.map(item => item.tahun);
	const dataTahun = {
		labels,
		datasets: [
			{
				label: 'Total berat penjualan',
				data: penjualanTahun.map(item => item.total_berat_kopi),
				backgroundColor: 'rgb(39, 145, 6)',
			},
		],
	};

	return (
		<>
			<Bar options={options} data={dataTahun} />
		</>
	);
};
