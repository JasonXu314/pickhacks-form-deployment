import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Tooltip, FormControlLabel, Switch, TextField } from '@mui/material';
import styles from '../styles/components/AcceptingResponses.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DateChooser = () => {
	const [startDate, setStartDate] = useState<dayjs.Dayjs | null | undefined>(null);
	const [endDate, setEndDate] = useState<dayjs.Dayjs | null | undefined>(null);

	useEffect(() => {
		axios
			.get('/api/settings')
			.then((resp) => {
				setStartDate(dayjs(resp.data.startDate));
				setEndDate(dayjs(resp.data.endDate));
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const startHandler = (val: dayjs.Dayjs | null) => {
		setStartDate(val);
		if (val === null) return;

		axios
			.post('/api/settings', {
				startDate: val,
			})
			.then((resp) => {
				if (endDate?.isBefore(val)) {
					endHandler(val.add(1, 'day'));
				} else if (val?.diff(endDate, 'day') < -6) {
					endHandler(val.add(6, 'day'));
				}
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const endHandler = (val: dayjs.Dayjs | null) => {
		setEndDate(val);
		if (val === null) return;

		axios
			.post('/api/settings', {
				endDate: val,
			})
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div style={{ display: 'flex', gap: '1em' }}>
			<DatePicker
				label="Interview Start Date"
				defaultValue={dayjs('2022-04-17')}
				value={startDate}
				onChange={(newValue) => {
					startHandler(newValue);
				}}
				minDate={dayjs(new Date())}
			/>
			<DatePicker
				label="Interview End Date"
				defaultValue={dayjs('2022-04-17')}
				value={endDate}
				onChange={(newValue) => {
					endHandler(newValue);
				}}
				minDate={startDate}
				maxDate={startDate?.add(6, 'day')}
			/>
		</div>
	);
};

export default DateChooser;
