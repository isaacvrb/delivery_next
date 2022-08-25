import styles from './styles.module.css';
import MailSent from './mailSent.svg';
import { useAppContext } from '../../contexts/app';

type Props = {
    icon: string;
    width: number;
    height: number;
}
const Icon = ({ icon, width, height }: Props) => {
    const { tenant } = useAppContext();

    return (
        <div style={{ width, height }}>
            {icon === 'mailSent' && <MailSent color={tenant?.mainColor}/>}
        </div>
    );
}

export default Icon;