import { useTranslation } from 'react-i18next';
import './style.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router';

const ErrorPage = () => {
	const { t } = useTranslation('global');

	return (
		<Stack alignItems={'center'} gap={1}>
			<div className="face">
				<div className="band">
					<div className="red"></div>
					<div className="white"></div>
					<div className="blue"></div>
				</div>
				<div className="eyes"></div>
				<div className="dimples"></div>
				<div className="mouth"></div>
			</div>

			<h1>Oops! {t('error.somethingWrong')}!</h1>
			<Button href="/" LinkComponent={Link} variant="contained" color="info">
				{t('returnToHome')}
			</Button>
		</Stack>
	);
};

export default ErrorPage;
