import { SetStateAction, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TextField, Tooltip } from '@mui/material';

interface IProps {
	index: number;
	setIndex: React.Dispatch<SetStateAction<number>>;
	maxSize: number;
}

const ArrowSwitcher = ({ index, setIndex, maxSize }: IProps) => {
	const [field, setField] = useState<string>(index.toString());

	useEffect(() => {
		setField(index.toString());
	}, [index]);

	const changeHandler = (val: string) => {
		setField(val);
		if (!val) {
			return;
		}
		let temp = parseInt(val);
		if (temp < 1 || temp > maxSize) {
			return;
		}
		setIndex(temp);
	};

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '.5em',
			}}
		>
			<Tooltip title="Previous response">
				<IconButton size="large" disabled={index <= 1} onClick={() => changeHandler((index - 1).toString())}>
					<ArrowBackIosNewIcon sx={{ fontSize: '.5em', fontWeight: 'bold' }} />
				</IconButton>
			</Tooltip>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<TextField
					variant="filled"
					hiddenLabel
					size="small"
					type="number"
					value={field}
					onChange={(e) => changeHandler(e.target.value)}
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
						width: '3em',
					}}
					InputProps={{
						inputProps: {
							max: maxSize,
							min: 1,
							style: {
								padding: 3,
								paddingLeft: 0,
								paddingRight: 0,
								textAlign: 'right',
							},
						},
					}}
				/>
				<p style={{ margin: '0 .5em', fontSize: '.9em' }}>of</p>
				<p style={{ margin: '0 .5em', fontSize: '.9em' }}>{maxSize}</p>
			</div>
			<Tooltip title="Next response">
				<IconButton size="large" disabled={index >= maxSize} onClick={() => changeHandler((index + 1).toString())}>
					<ArrowForwardIosIcon sx={{ fontSize: '.5em', fontWeight: 'bold' }} />
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default ArrowSwitcher;
