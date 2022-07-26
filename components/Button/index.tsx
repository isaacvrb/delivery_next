import { useAppContext } from '../../contexts/AppContext';
import styles from './styles.module.css';

type Props = {
    label: string;
    onClick: () => void;
    fill?: boolean
}

const Button = ({ label, onClick, fill }: Props) => {
    const { tenant } = useAppContext();

    return (
        <div
            className={styles.container}
            onClick={onClick}
            style={{
                color: fill ? '#fff' : tenant?.mainColor,
                borderColor: tenant?.mainColor,
                backgroundColor: fill ? tenant?.mainColor : 'transparent'
            }}
        >
            {label}
        </div>
    );
}

export default Button;