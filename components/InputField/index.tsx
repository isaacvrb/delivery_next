import EyeOn from './EyeOn.svg';
import EyeOff from './EyeOff.svg';
import styles from './styles.module.css';
import { useAppContext } from '../../contexts/app';
import { useState } from 'react';

type Props = {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
  warning?: boolean;
};
const InputField = ({ onChange, password, placeholder, value, warning }: Props) => {
  const { tenant } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderColor: !warning ? (focused ? tenant?.mainColor : '#f9f9fb') : '#f00',
        backgroundColor: focused ? '#fff' : '#f9f9fb',
      }}
    >
      <input
        className={styles.input}
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {password && (
        <div className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
          {showPassword && <EyeOn color="#bbb" />}
          {!showPassword && <EyeOff color="#bbb" />}
        </div>
      )}
    </div>
  );
};

export default InputField;
