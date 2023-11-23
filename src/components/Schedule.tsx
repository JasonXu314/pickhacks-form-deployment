import ScheduleSelector from 'react-schedule-selector';
import { FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/components/Schedule.module.css';
import Required from './Required';
import axios from 'axios';
import dayjs from 'dayjs';

interface IProps {
	schedule: Date[];
	setSchedule?: React.Dispatch<SetStateAction<Date[]>>;
	required: boolean;
	error?: boolean;
	defaultStart?: boolean;
}

const Schedule = ({ schedule, setSchedule, required, error, defaultStart }: IProps) => {
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [days, setDays] = useState(5);

	useEffect(() => {
		axios
			.get('/api/settings')
			.then((resp) => {
				setStartDate(dayjs(resp.data.startDate).toDate());
				setDays(Math.abs(dayjs(resp.data.startDate).diff(dayjs(resp.data.endDate), 'day')) + 1);
				if (defaultStart) {
					setDays(dayjs(schedule[schedule.length - 1]).diff(dayjs(schedule[0]), 'day') + 1);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className={styles.box} style={{ outline: error ? '1px solid rgb(217,48,37)' : 0 }}>
			<p style={{ marginBottom: '1em' }}>Select your availablity for interviews: {required && <span style={{ color: '#D93025' }}> *</span>}</p>
			<ScheduleSelector
				selection={schedule}
				startDate={!defaultStart ? startDate : undefined}
				numDays={days}
				minTime={16}
				maxTime={21}
				hourlyChunks={2}
				timeFormat="h:mma"
				onChange={(e) => (setSchedule ? setSchedule(e) : '')}
				renderDateLabel={(date) => (
					<p>
						{date.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3)}
						<br />
						{date.getMonth() + 1}/{date.getDate()}
					</p>
				)}
				unselectedColor="rgb(205, 223, 231)"
				selectedColor="rgb(4, 96, 133)"
			/>
			{setSchedule && (
				<Button sx={{ alignSelf: 'flex-end', mt: 2 }} onClick={() => setSchedule([])}>
					Clear
				</Button>
			)}
			{error && <Required />}
		</div>
	);
};

export default Schedule;
