import { TextField, Alert } from '@mui/material';
import React, { SetStateAction, useEffect, useRef } from 'react';
import styles from '../styles/components/InputField.module.css';
import Required from './Required';

interface IProps {
	question: string;
	required?: boolean;
	value: string;
	setValue: React.Dispatch<SetStateAction<string>>;
	error: boolean;
}

const InputField = React.forwardRef(function InputField({ question, required, value, setValue, error }: IProps, ref: React.ForwardedRef<HTMLDivElement>) {
	return (
		<div className={styles.box} style={{ outline: error ? '1px solid rgb(217,48,37)' : 0 }}>
			<p style={{ marginBottom: '1.75em' }}>
				{question} {required && <span style={{ color: '#D93025' }}> *</span>}
			</p>
			<TextField
				hiddenLabel
				required={required}
				variant="filled"
				size="small"
				placeholder="Your answer"
				error={error}
                inputRef={ref}
				sx={{
					'.MuiFilledInput-root': {
						backgroundColor: 'white',
						fontSize: '.9em',
						transition: 0,
					},
					'.MuiFilledInput-root:hover': {
						backgroundColor: 'white',
					},
                    '& .MuiFilledInput-root.Mui-focused': {
                        backgroundColor: 'white',
                    },
					pb: 1,
					maxWidth: '50%',
				}}
				inputProps={{
					style: {
						paddingLeft: 0,
						paddingBottom: 3,
					},
				}}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{error && <Required />}
		</div>
	);
});

export default InputField;
