import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { Tenant } from '../../types/Tenant';

import styles from '../../styles/SignUp.module.css';
import Head from 'next/head';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUp = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {

    }
    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Cadastro | {data.tenant.name}</title>
            </Head>

            <Header backHref={`/${data.tenant.slug}/login`} />

            <div className={styles.header}>{data.tenant.name}</div>

            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >Preencha os campos para criar o seu cadastro.</div>
            <div className={styles.line}></div>

            <div className={styles.formArea}>

                <div className={styles.inputArea}>
                    <InputField
                        placeholder='Digite seu nome'
                        value={name}
                        onChange={(value)=>setName(value)}
                    />
                </div>

                <div className={styles.inputArea}>
                    <InputField
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(value)=>setEmail(value)}
                    />
                </div>

                <div className={styles.inputArea}>
                    <InputField
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(value)=>setPassword(value)}
                        password
                    />
                </div>

                <div className={styles.inputArea}>
                    <Button
                        label='Cadastrar'
                        onClick={handleSubmit}
                        fill
                    />
                </div>

                <div className={styles.forgetArea} >
                    Já tem cadastro? <Link href={`/${data.tenant.slug}/login`}>
                        <a style={{ color: data.tenant.mainColor }}>Fazer Login</a>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default SignUp;

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