import ScheduleSelector from 'react-schedule-selector';
import { FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button } from '@mui/material';
import { SetStateAction } from 'react';
import styles from '../styles/components/Schedule.module.css';
import Required from './Required';

interface IProps {
	schedule: Date[];
	setSchedule?: React.Dispatch<SetStateAction<Date[]>>;
	required: boolean;
	error: boolean;
}

const Schedule = ({ schedule, setSchedule, required, error }: IProps) => {
	return (
		<div className={styles.box} style={{ outline: error ? '1px solid rgb(217,48,37)' : 0 }}>
			<p style={{ marginBottom: '1em' }}>Select your availablity for interviews: {required && <span style={{ color: '#D93025' }}> *</span>}</p>
			<ScheduleSelector
				selection={schedule}
				startDate={new Date()}
				numDays={5}
				minTime={16}
				maxTime={21}
				hourlyChunks={2}
				timeFormat="h:mma"
				onChange={(e) => (setSchedule ? setSchedule(e) : '')}
				renderDateLabel={(date) => (
					<p>
						{date.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3)} {date.getMonth()}/{date.getDate()}
					</p>
				)}
				unselectedColor="rgb(205, 223, 231)"
				selectedColor="rgb(4, 96, 133)"
			/>
			{setSchedule && <Button sx={{ alignSelf: 'flex-end', mt: 2 }} onClick={() => setSchedule([])}>
				Clear
			</Button>}
			{error && <Required />}
		</div>
	);
};

export default Schedule;
