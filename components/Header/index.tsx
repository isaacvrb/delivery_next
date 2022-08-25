import Link from 'next/link';
import { useAppContext } from '../../contexts/app';
import BackIcon from './backIcon.svg';
import styles from './styles.module.css';

type Props = {
    backHref: string;
    title?: string;
    subtitle?: string;
    invert?: boolean;
}
const Header = ({ backHref, subtitle, title, invert }: Props) => {
    const { tenant } = useAppContext()

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={backHref}>
                    <a className={ invert ? styles.buttonTransparent : '' }>
                        <BackIcon color={ invert ? '#fff' : tenant?.mainColor} />
                    </a>
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title &&
                    <div
                        className={styles.title}
                        style={{ color: invert ? '#fff': '#1b1b1b' }}
                    >{title}</div>
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