import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Tooltip, FormControlLabel, Switch, TextField } from '@mui/material';
import styles from '../styles/components/AcceptingResponses.module.css';

const AcceptingResponses = () => {
	const [val, setVal] = useState(false);
	const [init, setInit] = useState(true);
	const [field, setField] = useState('');

	useEffect(() => {
		axios
			.get('/api/settings')
			.then((resp) => {
				setVal(resp.data.accepting);
				setField(resp.data.message);
				setInit(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const changeHandler = () => {
		axios
			.post('/api/settings', {
				accepting: !val,
			})
			.then(() => {
				setVal(!val);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fieldHandler = (val: string) => {
        setField(val);
		axios
			.post('/api/settings', {
				message: val,
			})
			.then(() => {
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (init) return null;

	if (val) {
		return (
			<FormControlLabel
				control={<Switch color="primary" checked={val} onChange={changeHandler} />}
				label={<p style={{ fontSize: '.75em', color: 'grey' }}>Accepting responses</p>}
				labelPlacement="start"
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<FormControlLabel
					control={<Switch color="primary" checked={val} onChange={changeHandler} />}
					label={<p style={{ fontSize: '.75em', color: 'white' }}>Not accepting responses</p>}
					labelPlacement="start"
					sx={{
						alignSelf: 'flex-end',
						marginLeft: 'auto',
					}}
				/>
			</div>
			<div className={styles.message}>
				<p className={styles.messageTitle}>Message for respondents</p>
				<TextField
					variant="filled"
					hiddenLabel
					size="small"
					placeholder="This form is no longer accepting responses"
					value={field}
					onChange={(e) => fieldHandler(e.target.value)}
					sx={{
						'.MuiFilledInput-root': {
							backgroundColor: 'white',
							fontSize: '.9em',
							transition: 0,
							padding: 0,
						},
						'.MuiFilledInput-root:hover': {
							backgroundColor: 'white',
						},
						'& .MuiFilledInput-root.Mui-focused': {
							backgroundColor: 'white',
						},
						'& .MuiFilledInput-root.Mui-disabled': {
							backgroundColor: 'white',
						},
						p: 0,
					}}
					InputProps={{
						inputProps: {
							style: {
								padding: 3,
								paddingLeft: 0,
								paddingRight: 0,
							},
						},
					}}
				/>
			</div>
		</div>
	);
};

export default AcceptingResponses;
