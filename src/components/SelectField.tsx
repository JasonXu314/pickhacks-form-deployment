import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SetStateAction } from 'react';
import styles from '../styles/components/SelectField.module.css';

interface IProps {
	question: string;
	required?: boolean;
	value: string;
	setValue: React.Dispatch<SetStateAction<string>>;
	options: string[] | number[];
	error: boolean;
}

const SelectField = ({ question, required, value, setValue, options, error }: IProps) => {
	return (
		<div className={styles.box} style={{ outline: error ? '1px solid rgb(217,48,37)' : 0 }}>
			<p style={{ marginBottom: '1em' }}>
				{question} {required && <span style={{ color: '#D93025' }}> *</span>}
			</p>
			<FormControl>
				<Select
					displayEmpty
					value={value}
					renderValue={(selected) => {
						if (selected.length === 0) {
							return <p style={{ color: 'grey' }}>Choose</p>;
						}
						return selected;
					}}
					placeholder="Choose"
					onChange={(e) => setValue(e.target.value)}
					required={required}
					sx={{
						maxWidth: '50%',
						fontSize: '.9em',
					}}
				>
					<MenuItem value="" sx={{ p: 2, fontSize: '.9em', color: 'grey' }}>
						Choose
					</MenuItem>
					<div className={styles.line}></div>
					{options.map((option) => (
						<MenuItem key={option} value={option} sx={{ p: 2, fontSize: '.9em' }}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default SelectField;
