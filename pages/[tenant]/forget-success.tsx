import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { Tenant } from '../../types/Tenant';

import styles from '../../styles/ForgetSuccess.module.css';
import Head from 'next/head';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from '../../components/Icon';

const ForgetSuccess = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const handleSubmit = async () => {
        router.push(`/${data.tenant.slug}/login`);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Esqueci a senha</title>
            </Head>

            <Header backHref={`/${data.tenant.slug}/forget`} />

            <div className={styles.iconArea}>
                <Icon
                    color={tenant?.mainColor ? tenant.mainColor : ''}
                    icon="mailSent"
                    width={99}
                    height={81}
                />
            </div>

            <div className={styles.title}>Verifique seu e-mail</div>

            <div className={styles.subtitle}>
                Enviamos as instruções para recuperação de senha para o seu
                e-mail.
            </div>

            <div className={styles.formArea}>
                <div className={styles.inputArea}>
                    <Button label="Fazer Login" onClick={handleSubmit} fill />
                </div>
            </div>
        </div>
    );
};

export default ForgetSuccess;

type Props = {
    tenant: Tenant;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    // Get Tenant
    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    return {
        props: {
            tenant,
        },
    };
};
