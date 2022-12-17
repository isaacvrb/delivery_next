import styles from '../../../styles/Order-id.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../types/Tenant';
import { useAppContext } from '../../../contexts/app';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head';
import Header from '../../../components/Header';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import CartProductItem from '../../../components/CartProductItem';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import { Order } from '../../../types/Order';

const OrderID = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();
  const api = useApi(data.tenant.slug);

  useEffect(() => {
    if (data.order.status !== 'delivered') {
      setTimeout(() => {
        router.reload();
      }, 60000); // 60 seconds
    }
  }, []);

  const orderStatusList = {
    preparing: {
      label: 'Preparando',
      longLabel: 'Preparando seu pedido...',
      backgroundColor: '#fefae6',
      fontColor: '#d4bc34',
      pct: 25,
    },
    sent: {
      label: 'Enviado',
      longLabel: 'Enviamos o seu pedido!',
      backgroundColor: '#f1f3f8',
      fontColor: '#758cbc',
      pct: 75,
    },
    delivered: {
      label: 'Entregue',
      longLabel: 'Seu pedido foi entrege',
      backgroundColor: '#f1f8f6',
      fontColor: '#6ab70a',
      pct: 100,
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pedido #{data.order.id}</title>
      </Head>

      <Header backHref={`/${data.tenant.slug}`} title={`Pedido #${data.order.id}`} />

      {data.order.status !== 'delivered' && (
        <div
          className={styles.statusArea}
          style={{ backgroundColor: orderStatusList[data.order.status].backgroundColor }}
        >
          <div
            className={styles.statusLongLabel}
            style={{ color: orderStatusList[data.order.status].fontColor }}
          >
            {orderStatusList[data.order.status].longLabel}
          </div>
          <div className={styles.statusPct}>
            <div
              className={styles.statusPctBar}
              style={{
                width: `${orderStatusList[data.order.status].pct}%`,
                backgroundColor: orderStatusList[data.order.status].fontColor,
              }}
            ></div>
          </div>
          <div className={styles.statusMsg}>Aguardando mudança de status...</div>
        </div>
      )}

      <div className={styles.orderInfoArea}>
        <div
          className={styles.orderInfoStatus}
          style={{
            backgroundColor: orderStatusList[data.order.status].backgroundColor,
            color: orderStatusList[data.order.status].fontColor,
          }}
        >
          {orderStatusList[data.order.status].label}
        </div>
        <div className={styles.orderInfoQt}>
          {data.order.products.length} {data.order.products.length === 1 ? 'item' : 'itens'}
        </div>
        <div className={styles.orderInfoDate}>{formatter.formatDate(data.order.orderDate)}</div>
      </div>

      <div className={styles.productsList}>
        {data.order.products.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={() => {}}
            noEdit
          />
        ))}
      </div>

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon="location"
              rightIcon="rightArrow"
              value={`${data.order.shippingAddress.street} ${data.order.shippingAddress.number} - ${data.order.shippingAddress.city}`}
              onClick={() => {}}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="money"
                  value="Dinheiro"
                  onClick={() => {}}
                  fill={data.order.paymentType === 'money'}
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="card"
                  value="Cartão"
                  onClick={() => {}}
                  fill={data.order.paymentType === 'card'}
                />
              </div>
            </div>
          </div>
        </div>

        {data.order.paymentType === 'money' && (
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                placeholder="Quanto você tem em dinheiro"
                value={data.order.paymentChange?.toString() ?? ''}
                onChange={() => {}}
              />
            </div>
          </div>
        )}

        {data.order.cupom && (
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Cupon de desconto</div>
            <div className={styles.infoBody}>
              <ButtonWithIcon
                color={data.tenant.mainColor}
                leftIcon="cupon"
                rightIcon="checked"
                value={data.order.cupom.toLocaleUpperCase()}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(data.order.subtotal)}</div>
        </div>
        {data.order.cupomDiscount && (
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Desconto</div>
            <div className={styles.resumeRight}>-{formatter.formatPrice(data.order.cupomDiscount)}</div>
          </div>
        )}
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {data.order.shippingPrice > 0 ? formatter.formatPrice(data.order.shippingPrice) : '--'}
          </div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor }}>
            {formatter.formatPrice(data.order.total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderID;

type Props = {
  tenant: Tenant;
  user: User | null;
  token: string;
  order: Order;
};
export const getServerSideProps: GetServerSideProps = async context => {
  const { tenant: tenantSlug, orderid } = context.query;
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

  // Get Order
  const order = await api.getOrder(parseInt(orderid as string));

  return {
    props: {
      tenant,
      user,
      token,
      order,
    },
  };
};
