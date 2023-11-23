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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Tooltip, FormControlLabel, Switch, TextField, Alert } from '@mui/material';
import { ObjectId } from 'mongodb';
import AcceptingResponses from '../components/AcceptingResponses';
import Loading from '../components/Loading';
import DateChooser from '../components/DateChooser';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

interface IData {
	_id: ObjectId;
	name: string;
	email: string;
	year: string;
	firstChoice: string;
	secondChoice: string;
	schedule: Date[];
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '24em',
	bgcolor: 'background.paper',
	boxShadow: 24,
	padding: '1.25em 1.5em',
	display: 'flex',
	flexDirection: 'column',
	gap: '1em',
	maxWidth: '90%',
};

const Dashboard = () => {
	const { user, error, isLoading } = useUser();
	const [admin, setAdmin] = useState(false);
	const [data, setData] = useState<IData[]>([]);
	const [index, setIndex] = useState(1);
	const [open, setOpen] = useState(false);
	const [deleteAllOpen, setDeleteAllOpen] = useState(false);
	const [adminOpen, setAdminOpen] = useState(false);
	const [signoutOpen, setSignoutOpen] = useState(false);
	const [adminField, setAdminField] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [init, setInit] = useState(true);

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
					setInit(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [isLoading, error, user, router]);

	useEffect(() => {
		axios
			.get('/api/data')
			.then((resp) => {
				setData(resp.data);
				if (resp.data.length === 0) {
					setIndex(0);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const deleteAll = () => {
		axios
			.delete('/api/data', {
				data: {
					_id: 'all',
				},
			})
			.then(() => {
				setData([]);
				setIndex(0);
				setDeleteAllOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteResponse = () => {
		axios
			.delete('/api/data', {
				data: data[index - 1],
			})
			.then(() => {
				setData([...data.filter((dat) => dat !== data[index - 1])]);
				if (index === data.length) {
					setIndex((index) => index - 1);
				}
				setOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const adminHandler = () => {
		axios
			.post('/api/admin', {
				email: adminField,
			})
			.then((resp) => {
				setAdminField('');
				setErrorMsg('');
				setSuccessMsg('Email successfully added');
			})
			.catch((err) => {
				setSuccessMsg('');
				setErrorMsg(err.response.data);
			});
	};

	if (isLoading) return <Loading />;
	if (error) return <div>{error.message}</div>;

	if (!user || (!admin && !init)) {
		return <p>You aren&apos;t allowed here &gt;:( leave</p>;
	}

	return (
		user &&
		admin && (
			<>
				<Head>
					<title>Pickhacks Form | Dashboard</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.main}>
					<Modal open={open} onClose={() => setOpen(false)}>
						<Box sx={style}>
							<Typography variant="h6" component="h2">
								Delete Response
							</Typography>
							<Typography variant="body2" mb={1}>
								Are you sure you want to delete this response? This action cannot be undone.
							</Typography>
							<div style={{ alignSelf: 'flex-end' }}>
								<Button sx={{ color: 'grey' }} onClick={() => setOpen(false)}>
									Cancel
								</Button>
								<Button onClick={() => deleteResponse()}>Yes</Button>
							</div>
						</Box>
					</Modal>
					<Modal open={deleteAllOpen} onClose={() => setDeleteAllOpen(false)}>
						<Box sx={style}>
							<Typography variant="h6" component="h2">
								Delete All Responses
							</Typography>
							<Typography variant="body2" mb={1}>
								Are you sure you want to delete all responses? This action cannot be undone.
							</Typography>
							<div style={{ alignSelf: 'flex-end' }}>
								<Button sx={{ color: 'grey' }} onClick={() => setDeleteAllOpen(false)}>
									Cancel
								</Button>
								<Button onClick={() => deleteAll()}>Yes</Button>
							</div>
						</Box>
					</Modal>
					<Modal open={signoutOpen} onClose={() => setSignoutOpen(false)}>
						<Box sx={style}>
							<Typography variant="h6" component="h2">
								Sign Out
							</Typography>
							<Typography variant="body2" mb={1}>
								Are you sure you want to sign out of your account?
							</Typography>
							<div style={{ alignSelf: 'flex-end' }}>
								<Button sx={{ color: 'grey' }} onClick={() => setSignoutOpen(false)}>
									Cancel
								</Button>
								<Button onClick={() => router.push('/api/auth/logout?returnTo=https://localhost:3000/')}>Sign out</Button>
							</div>
						</Box>
					</Modal>
					<Modal
						open={adminOpen}
						onClose={() => {
							setAdminField('');
							setErrorMsg('');
							setSuccessMsg('');
							setAdminOpen(false);
						}}
					>
						<Box sx={style}>
							<Typography variant="h6" component="h2">
								Add Admin
							</Typography>
							{successMsg && <Alert severity="success">{successMsg}</Alert>}
							{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
							<TextField
								variant="filled"
								hiddenLabel
								size="small"
								placeholder="Enter email address..."
								value={adminField}
								onChange={(e) => setAdminField(e.target.value)}
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
							<div style={{ alignSelf: 'flex-end' }}>
								<Button
									sx={{ color: 'grey' }}
									onClick={() => {
										setAdminField('');
										setErrorMsg('');
										setSuccessMsg('');
										setAdminOpen(false);
									}}
								>
									Cancel
								</Button>
								<Button onClick={adminHandler}>Add</Button>
							</div>
						</Box>
					</Modal>

					<div className={styles.formContainer}>
						<div className={styles.buttonRow}>
							<Button variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => router.push('/')}>
								Back to form
							</Button>
							<div style={{ display: 'flex', gap: '1em' }}>
								{/* <Button variant="outlined" startIcon={<LogoutIcon />} onClick={() => setSignoutOpen(true)}>
									Sign Out
								</Button> */}
								<Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setAdminOpen(true)}>
									Add admin
								</Button>
							</div>
						</div>
						<div className={styles.header}>
							<div className={styles.topSection}>
								<div className={styles.row} style={{ padding: 0, flexWrap: 'wrap', gap: '1em' }}>
									<p className={styles.responses}>{data.length} responses</p>
                                    <DateChooser />
								</div>
								{/* <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5em' }}> */}
									{/* <DateChooser /> */}
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setDeleteAllOpen(true)} disabled={index === 0} sx={{alignSelf: 'flex-start', marginLeft: 'auto'}}>
										Delete all responses
									</Button>
								{/* </div> */}
                                <AcceptingResponses />
							</div>

							<div className={styles.line}></div>
							<div className={styles.row}>
								<ArrowSwitcher index={index} setIndex={setIndex} maxSize={data.length} />
								<Tooltip title="Delete response">
									<IconButton size="large" onClick={() => setOpen(true)} disabled={index === 0}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						{data.length > 0 && (
							<>
								<InputField question="What is your name?" disabled required value={data[index - 1].name} />
								<InputField question="What is your university email?" required value={data[index - 1].email} disabled />
								<RadioField
									question="What year are you?"
									required
									value={data[index - 1].year}
									options={['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student']}
									disabled
								/>
								<RadioField
									question="What is your first choice team?"
									required
									value={data[index - 1].firstChoice}
									options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
									disabled
								/>
								<RadioField
									question="What is your second choice team?"
									required
									value={data[index - 1].secondChoice}
									options={['Design/Art', 'Marketing', 'Development', 'Finance', 'Logistics']}
									disabled
								/>
								<Schedule schedule={data[index - 1].schedule} required />
							</>
						)}
					</div>
				</main>
			</>
		)
	);
};

export default Dashboard;
