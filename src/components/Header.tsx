import { SetStateAction } from 'react';
import styles from '../styles/components/Header.module.css';

interface IProps {
	submitted: boolean;
	setSubmitted: React.Dispatch<SetStateAction<boolean>>;
	accepting: boolean;
	message: string;
}

const Header = ({ submitted, setSubmitted, accepting, message }: IProps) => {
	if (submitted) {
		return (
			<div className={styles.box}>
				<div className={styles.accentLine}></div>
				<div className={styles.container}>
					<p className={styles.title} style={{ marginTop: '10px' }}>
						ACM Hack Recruitment Application
					</p>
					<div>
						<p className={styles.text}>Your response has been recorded.<br/><br/>You will be emailed a Zoom link soon to confirm your interview.<br/>If you have any questions feel free to reach out to <b>msthackathon@umsystem.edu</b></p>
					</div>
					<p className={styles.text} style={{ marginTop: '10px' }}>
						<a
							onClick={() => setSubmitted(false)}
							style={{ color: 'rgb(26,115,232)', fontSize: '.95em', textDecoration: 'underline', cursor: 'pointer' }}
						>
							Submit another response
						</a>
					</p>
				</div>
			</div>
		);
	}

	if (!accepting) {
		return (
			<div className={styles.box}>
				<div className={styles.accentLine}></div>
				<div className={styles.container}>
					<p className={styles.title} style={{ marginTop: '10px' }}>
						ACM Hack Recruitment Application
					</p>
					<div>
						{message && <p className={styles.text}>{message}</p>}
						{!message && (
							<>
								<p className={styles.text}>
									The form ACM Hack Recruitment Application is no longer accepting responses.
									<div style={{margin: '.25em'}}></div>
									Try contacting the owner of the form if you think this is a mistake.
								</p>
							</>
						)}
					</div>
					{/* <p className={styles.text} style={{ marginTop: '10px' }}>
						<a
							onClick={() => setSubmitted(false)}
							style={{ color: 'rgb(26,115,232)', fontSize: '.95em', textDecoration: 'underline', cursor: 'pointer' }}
						>
							Submit another response
						</a>
					</p> */}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.box}>
			<div className={styles.accentLine}></div>
			<div className={styles.container}>
				<p className={styles.title}>ACM Hack Recruitment Application</p>
				<div>
					<p className={styles.text} style={{ marginBottom: '5px' }}>
						Please fill out the following to indicate interest in joining ACM Hack.
					</p>
					<p className={styles.text}>We will be in contact with you regarding the next step.</p>
				</div>
				<p className={styles.text} style={{ marginTop: '10px' }}>
					<b>
						If you are unfamiliar with each team&apos;s role, you can read more about them{' '}
						<a href="https://drive.google.com/file/d/1bCjYw3k7c1wsBYVC1iPYBYouN6Wu27gD/view" target="_blank" style={{ color: 'blue' }}>
							here
						</a>
						.
					</b>
				</p>
				<p style={{ color: '#D93025', fontSize: '.9em' }}>* Indicates required question</p>
			</div>
		</div>
	);
};

export default Header;
