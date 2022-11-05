import styles from '../../styles/MyAddresses.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head';
import Header from '../../components/Header';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import { Address } from '../../types/Address';
import AddressItem from '../../components/AddressItem';

const MyAddresses = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();

  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  };

  const handleAddressSelect = (address: Address) => {
    console.log(`Selecionou o endereço: ${address.street} ${address.number}`);
  };

  const handleAddressEdit = (id: number) => {
    console.log(`Editando o ${id}`);
  };

  const handleAddressDelete = (id: number) => {
    console.log(`Deletando o ${id}`);
  };

  // Menu Events
  const [menuOpened, setMenuOpened] = useState(0);
  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName;
    if (!['path', 'svg'].includes(tagName)) {
      setMenuOpened(0);
    }
  };
  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent);
    window.addEventListener('click', handleMenuEvent);
    return () => window.removeEventListener('click', handleMenuEvent);
  }, [menuOpened]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços</title>
      </Head>

      <Header backHref={`/${data.tenant.slug}/checkout`} title="Meus Endereços" />

      <div className={styles.list}>
        {data.addresses.map((item, index) => (
          <AddressItem
            key={index}
            color={data.tenant.mainColor}
            address={item}
            onSelect={handleAddressSelect}
            onEdit={handleAddressEdit}
            onDelete={handleAddressDelete}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        ))}
      </div>

      <div className={styles.btnArea}>
        <Button label="Novo Endereço" onClick={handleNewAddress} fill />
      </div>
    </div>
  );
};

export default MyAddresses;

type Props = {
  tenant: Tenant;
  user: User | null;
  token: string;
  addresses: Address[];
};
export const getServerSideProps: GetServerSideProps = async context => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } };
  }

  // Get Logged User
  let token = getCookie('token', context);
  if (!token) {
    token = '';
  }
  const user = await api.authorizeToken(token as string);
  if (!user) {
    return { redirect: { destination: `/login`, permanent: false } };
  }

  // Get Addresses from Logged User
  const addresses = await api.getUserAddresses(user.email);

  return {
    props: {
      tenant,
      user,
      token,
      addresses,
    },
  };
};
