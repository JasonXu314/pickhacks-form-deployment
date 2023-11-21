import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useRef } from 'react';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import InputField from '../components/InputField';
import RadioField from '../components/RadioField';
import { Button, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Schedule from '../components/Schedule';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

declare module '@mui/material/styles' {
	interface Palette {
		teal: Palette['primary'];
	}

	interface PaletteOptions {
		teal?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		teal: true;
	}
}

const theme = createTheme({
	palette: {
		teal: {
			main: '#056185',
			light: '#5998AF',
			dark: '#186D8F',
			contrastText: '#ffffff',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
			fontWeight: 'normal',
		},
	},
});

const Home: NextPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [year, setYear] = useState('');
	const [firstChoice, setFirstChoice] = useState('');
	const [secondChoice, setSecondChoice] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [schedule, setSchedule] = useState<Date[]>([]);
	const [error, setError] = useState('');

	const nameRef = useRef<HTMLDivElement>(null);
	const emailRef = useRef<HTMLDivElement>(null);
	const yearRef = useRef<HTMLDivElement>(null);
	const firstChoiceRef = useRef<HTMLDivElement>(null);
	const secondChoiceRef = useRef<HTMLDivElement>(null);

	const submitHandler = () => {
		if (!name) {
			setError('name');
			nameRef.current!.focus();
		} else if (!email) {
			setError('email');
			emailRef.current!.focus();
		} else if (!year) {
			setError('year');
			yearRef.current!.scrollIntoView({ block: 'center', inline: 'start' });
		} else if (!firstChoice) {
			setError('firstChoice');
			firstChoiceRef.current!.scrollIntoView({ block: 'center', inline: 'start' });
		} else if (!secondChoice) {
			setError('secondChoice');
			secondChoiceRef.current!.scrollIntoView({ block: 'center', inline: 'start' });
		} else if (schedule.length === 0) {
			setError('schedule');
		} else {
			axios
				.post('/api/data', {
					name,
					email,
					year,
					firstChoice,
					secondChoice,
					schedule,
				})
				.then(() => {
					setName('');
					setEmail('');
					setYear('');
					setFirstChoice('');
					setSecondChoice('');
					setSchedule([]);
					setError('');
					setSubmitted(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<Head>
				<title>Pickhacks Form</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				<main className={styles.main}>
					<img src="/banner.png" className={styles.banner}></img>
					<div className={styles.formContainer}>
						<Header submitted={submitted} setSubmitted={setSubmitted} />
						{!submitted && (
							<>
								<InputField question="What is your name?" required value={name} setValue={setName} error={error === 'name'} ref={nameRef} />
								<InputField
									question="What is your university email?"
									required
									value={email}
									setValue={setEmail}
									error={error === 'email'}
									ref={emailRef}
								/>
								<RadioField
									question="What year are you?"
									required
									value={year}
									setValue={setYear}
									options={['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student']}
									error={error === 'year'}
									ref={yearRef}
								/>
								<RadioField
									question="What is your first choice team?"
									required
									value={firstChoice}
									setValue={setFirstChoice}
									options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
									error={error === 'firstChoice'}
									ref={firstChoiceRef}
								/>
								<RadioField
									question="What is your second choice team?"
									required
									value={secondChoice}
									setValue={setSecondChoice}
									options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
									error={error === 'secondChoice'}
									ref={secondChoiceRef}
								/>
								<Schedule schedule={schedule} setSchedule={setSchedule} required error={error === 'schedule'} />
								<Button type="submit" variant="contained" color="teal" sx={{ alignSelf: 'flex-start', px: 3 }} onClick={submitHandler}>
									Submit
								</Button>
							</>
						)}
					</div>
					<Link href="/api/auth/login?returnTo=/dashboard">
						<Fab sx={{ position: 'fixed', bottom: '2em', right: '2em', backgroundColor: 'white' }}>
							<VisibilityIcon />
						</Fab>
					</Link>
				</main>
			</ThemeProvider>
		</>
	);
};

export default Home;
