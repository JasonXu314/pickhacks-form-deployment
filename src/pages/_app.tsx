import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</LocalizationProvider>
	);
}

export default MyApp;
