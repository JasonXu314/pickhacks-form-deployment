import { Alert } from '@mui/material';

const Required = () => {
	return (
		<Alert severity="error" sx={{ background: 'transparent', p: 0, color: '#D93025', fontSize: '.8em', alignItems: 'center' }}>
			This is a required question
		</Alert>
	);
};

export default Required;
