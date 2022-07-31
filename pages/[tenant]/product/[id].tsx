import styles from '../../../styles/Product-id.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../types/Tenant';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import Head from 'next/head';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';

const Product = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const formatter = useFormatter();
    const handleAddToCart = () => {

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.product.name} | {data.tenant.name}</title>
            </Head>

            <div className={styles.headerArea}>
                <Header
                    backHref={`/${data.tenant.slug}`}
                    title='Produto'
                    invert
                />
            </div>

            <div
                className={styles.headerBg}
                style={{ backgroundColor: data.tenant.mainColor }}
            ></div>

            <div className={styles.productImage}>
                <img src={data.product.image} alt=''/>
            </div>
            
            <div className={styles.category}>{data.product.categoryName}</div>

            <div
                className={styles.title}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >{data.product.name}</div>

            <div className={styles.line}></div>

            <div className={styles.description}>{data.product.description}</div>

            <div className={styles.qtText}>Quantidade</div>

            <div className={styles.area}>
                <div className={styles.areaLeft}>...</div>
                <div
                    className={styles.areaRight}
                    style={{ color: data.tenant.mainColor }}
                >{formatter.formatPrice(data.product.price)}</div>
            </div>

            <div className={styles.buttonArea}>
                <Button
                    label='Adicionar a sacola'
                    onClick={handleAddToCart}
                    fill
                />
            </div>

        </div>
    );
}

export default Product;

type Props = {
    tenant: Tenant;
    product: Product;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = useApi(tenantSlug as string);

    // Get Tenant
    const tenant = await api.getTenant();
    if(!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    }

    // Get Products
    const product = await api.getProduct(id as string);

    return {
        props: {
            tenant,
            product
        }
    }
}