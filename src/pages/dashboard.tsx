import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';
import Head from 'next/head';
import InputField from '../components/InputField';
import RadioField from '../components/RadioField';
import Schedule from '../components/Schedule';
import ArrowSwitcher from '../components/ArrowSwitcher';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface IData {
	name: string;
	email: string;
	year: string;
	firstChoice: string;
	secondChoice: string;
	schedule: string[];
}

const Dashboard = () => {
	const { user, error, isLoading } = useUser();
	const [admin, setAdmin] = useState(false);
	const [data, setData] = useState<IData[]>([]);
	const [index, setIndex] = useState(1);

	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !error && user) {
			axios
				.get(`/api/admin/?email=${user.email}`)
				.then((resp) => {
					if (resp.data === false) {
						router.push('/');
					}
					setAdmin(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});

	useEffect(() => {
		axios
			.get('/api/data')
			.then((resp) => {
				setData(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		user &&
		admin && (
			<>
				<Head>
					<title>Pickhacks Form | Dashboard</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.main}>
					<div className={styles.header}>
						<p className={styles.responses}>{data.length} responses</p>
                        <div className={styles.line}></div>
						<div className={styles.row}>
							<ArrowSwitcher index={index} setIndex={setIndex} maxSize={data.length} />
							<IconButton size="large">
								<DeleteIcon />
							</IconButton>
						</div>
					</div>
					{data.length > 0 && (
						<div className={styles.formContainer}>
							<InputField question="What is your name?" disabled required value={data[index - 1].name} error={error === 'name'} />
							<InputField question="What is your university email?" required value={data[index - 1].email} error={error === 'email'} disabled />
							<RadioField
								question="What year are you?"
								required
								value={data[index - 1].year}
								options={['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student']}
								error={error === 'year'}
								disabled
							/>
							<RadioField
								question="What is your first choice team?"
								required
								value={data[index - 1].firstChoice}
								options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
								error={error === 'firstChoice'}
								disabled
							/>
							<RadioField
								question="What is your second choice team?"
								required
								value={data[index - 1].secondChoice}
								options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
								error={error === 'secondChoice'}
								disabled
							/>
							{/* <Schedule schedule={data[index].schedule} required error={error === 'schedule'} /> */}
						</div>
					)}
				</main>
			</>
		)
	);
};

export default Dashboard;
