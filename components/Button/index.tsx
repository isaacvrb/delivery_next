import { useAppContext } from '../../contexts/app';
import styles from './styles.module.css';

type Props = {
  label: string;
  onClick: () => void;
  fill?: boolean;
  disabled?: boolean;
};

const Button = ({ label, onClick, fill, disabled }: Props) => {
  const { tenant } = useAppContext();

  return (
    <div
      className={styles.container}
      onClick={!disabled ? onClick : () => {}}
      style={{
        color: fill ? '#fff' : tenant?.mainColor,
        borderColor: tenant?.mainColor,
        backgroundColor: fill ? tenant?.mainColor : 'transparent',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {label}
    </div>
  );
};

export default Button;
