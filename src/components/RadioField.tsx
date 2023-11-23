import { FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import React, { SetStateAction } from 'react';
import styles from '../styles/components/RadioField.module.css';
import Required from './Required';

interface IProps {
	question: string;
	required?: boolean;
	value: string;
	setValue?: React.Dispatch<SetStateAction<string>>;
	options: string[] | number[];
	error?: boolean;
    disabled?: boolean;
}

const RadioField = React.forwardRef(function InputField(
	{ question, required, value, setValue, options, error, disabled }: IProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<div className={styles.box} style={{ outline: error ? '1px solid rgb(217,48,37)' : 0 }} ref={ref}>
			<p style={{ marginBottom: '1em' }}>
				{question} {required && <span style={{ color: '#D93025' }}> *</span>}
			</p>
			<FormControl required={required} disabled={disabled}>
				<RadioGroup value={value} onChange={(e) => (setValue ? setValue(e.target.value) : '')}>
					{options.map((option) => (
						<FormControlLabel key={option} value={option} control={<Radio />} label={<Typography variant="body2">{option}</Typography>} />
					))}
				</RadioGroup>
			</FormControl>
			{error && <Required />}
		</div>
	);
});

export default RadioField;
