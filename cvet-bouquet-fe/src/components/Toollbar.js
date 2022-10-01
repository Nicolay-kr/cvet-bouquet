import { useRouter } from 'next/router';
import styles from '../../styles/Toolbar.module.css';
import Button from '@mui/material/Button';
import Link from '../Link';

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
        <Button variant="contained" component={Link} noLinkStyle href="/" color={'primary'}>
          Go to the main page
        </Button>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => router.push('/catalog')}>Catalog</div>
      <div onClick={() => window.location.href = 'https://twitter.com/portexe'}>Twitter</div>
      <div onClick={() => window.location.href = 'https://github.com/portexe'}>GitHub</div>
    </div>
  );
};