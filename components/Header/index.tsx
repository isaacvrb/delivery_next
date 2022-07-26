import Link from 'next/link';
import { useAppContext } from '../../contexts/AppContext';
import BackIcon from './backIcon.svg';
import styles from './styles.module.css';

type Props = {
    backHref: string;
    title?: string;
    subtitle?: string;
}
const Header = ({ backHref, subtitle, title }: Props) => {
    const { tenant } = useAppContext()

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={backHref}>
                    <BackIcon color={tenant?.mainColor} />
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title &&
                    <div className={styles.title}>{title}</div>
                }
                {subtitle &&
                    <div className={styles.subtitle}>{subtitle}</div>
                }
            </div>
            <div className={styles.rightSide}></div>
        </div>
    );
}

export default Header;