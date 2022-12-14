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
			text: 'Data penjualan berdasarkan grade',
		},
	},
};

export const LineChart = () => {
	const [urlGet, setUrlGet] = useAtom(apiGet);
	const [urlPost, setUrlPost] = useAtom(apiPost);
	const [data, setData] = useState([]);
	const [data1, setData1] = useState([]);
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([]);

	useEffect(() => {
		fetch(`${urlGet}getdatagrafik`)
			.then(response => response.json())
			.then(response => {
				setData(response.data);
			});
	}, []);

	const labels = data.map(item => item.tahun);
	const dataGraph = {
		labels,
		datasets: [
			{
				label: 'Grade A',
				data: data.map(item => item.grade_a),
				backgroundColor: 'rgba(255, 99, 132, 1)',
			},
			{
				label: 'Grade B',
				data: data.map(item => item.grade_b),
				backgroundColor: 'rgba(53, 162, 235, 1)',
			},
			{
				label: 'Grade C',
				data: data.map(item => item.grade_c),
				backgroundColor: 'rgba(255, 206, 86, 1)',
			},
		],
	};

	return (
		<>
			<Bar options={options} data={dataGraph} />
		</>
	);
};
