import Card from './card.svg';
import Checked from './checked.svg';
import Cupon from './cupom.svg';
import Location from './location.svg';
import MailSent from './mailSent.svg';
import Money from './money.svg';
import RightArrow from './rightArrow.svg';

import { useAppContext } from '../../contexts/app';

type Props = {
    color: string;
    icon: string;
    width: number;
    height: number;
};
const Icon = ({ color, icon, width, height }: Props) => {
    const { tenant } = useAppContext();

    return (
        <div style={{ width, height }}>
            {icon === 'card' && <Card color={color} />}
            {icon === 'checked' && <Checked color={color} />}
            {icon === 'cupon' && <Cupon color={color} />}
            {icon === 'location' && <Location color={color} />}
            {icon === 'mailSent' && <MailSent color={color} />}
            {icon === 'money' && <Money color={color} />}
            {icon === 'rightArrow' && <RightArrow color={color} />}
        </div>
    );
};

export default Icon;
