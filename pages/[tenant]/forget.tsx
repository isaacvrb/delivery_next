import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { Tenant } from '../../types/Tenant';

import styles from '../../styles/Forget.module.css';
import Head from 'next/head';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Forget = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        router.push(`/${data.tenant.slug}/forget-success`);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Esqueci a senha | {data.tenant.name}</title>
            </Head>

            <Header backHref={`/${data.tenant.slug}/login`} />

            <div className={styles.header}>{data.tenant.name}</div>

            <div className={styles.title}>Esqueceu sua senha?</div>

            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir  a sua senha.</div>
            <div className={styles.line}></div>

            <div className={styles.formArea}>

                <div className={styles.inputArea}>
                    <InputField
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(value)=>setEmail(value)}
                    />
                </div>

                <div className={styles.inputArea}>
                    <Button
                        label='Enviar'
                        onClick={handleSubmit}
                        fill
                    />
                </div>
            </div>
        </div>
    );
}

export default Forget;

type Props = {
    tenant: Tenant;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    // Get Tenant
    const tenant = await api.getTenant();
    if(!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    }

    return {
        props: {
            tenant
        }
    }
}