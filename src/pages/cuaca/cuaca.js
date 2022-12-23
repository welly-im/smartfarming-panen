import { Fragment } from 'react';
import { Header } from '../../components/header';
export const Cuaca = () => {
	return (
		<>
			<Header />
			<div className='card p-3 mt-1 mx-3'>
				<div className='card-body shadow bg-white rounded'>
					<iframe
						src='https://www.accuweather.com/id/id/dampit/203265/december-weather/203265'
						title='Info Cuaca'
						width='1250'
						height='500'
						frameborder='0'></iframe>
				</div>
			</div>
		</>
	);
};
