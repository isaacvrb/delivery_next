import styles from '../../styles/Checkout.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import CartProductItem from '../../components/CartProductItem';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Checkout = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant, shippingAddress, shippingPrice } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);

  // Shipping
  const handleChangeAddress = () => {
    router.push(`/${data.tenant.slug}/myaddresses`);

    /*
    setShippingAddress({
      id: 1,
      cep: '99999-999',
      street: 'Rua das Flores',
      number: '321',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
    });
    setShippingPrice(9.5);
    */
  };

  //Payments
  const [paymentType, setPaymentType] = useState<'money' | 'card'>('money');
  const [paymentChange, setPaymentChange] = useState(0);

  // Cupom
  const [cupom, setCupom] = useState('');
  const [cupomDiscount, setCupomDiscount] = useState(0);
  const [cupomInput, setCupomInput] = useState('');
  const handleSetCupom = () => {
    if (cupomInput) {
      setCupom(cupomInput);
      setCupomDiscount(15.2);
    }
  };

  // Resume
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let sub = 0;
    for (let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);

  const handleFinish = () => {
    // router.push(`/${data.tenant.slug}/checkout`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout</title>
      </Head>

      <Header backHref={`/${data.tenant.slug}`} title="Checkout" />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon="location"
              rightIcon="rightArrow"
              value={
                shippingAddress
                  ? `${shippingAddress.street} ${shippingAddress.number} - ${shippingAddress.city}`
                  : 'Escolha um endereço'
              }
              onClick={handleChangeAddress}
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
                  onClick={() => setPaymentType('money')}
                  fill={paymentType === 'money'}
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="card"
                  value="Cartão"
                  onClick={() => setPaymentType('card')}
                  fill={paymentType === 'card'}
                />
              </div>
            </div>
          </div>
        </div>

        {paymentType === 'money' && (
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                placeholder="Quanto você tem em dinheiro"
                value={paymentChange ? paymentChange.toString() : ''}
                onChange={newValue => setPaymentChange(parseInt(newValue))}
              />
            </div>
          </div>
        )}

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Cupon de desconto</div>
          {cupom && (
            <div className={styles.infoBody}>
              <ButtonWithIcon
                color={data.tenant.mainColor}
                leftIcon="cupon"
                rightIcon="checked"
                value={cupom.toLocaleUpperCase()}
              />
            </div>
          )}
          {!cupom && (
            <div className={styles.cupomInput}>
              <InputField
                placeholder="Tem um cupom?"
                value={cupomInput}
                onChange={newValue => setCupomInput(newValue)}
              />
              <Button label="OK" onClick={handleSetCupom} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.productsQuantity}>
        {cart.length} {cart.length === 1 ? 'item' : 'itens'}
      </div>

      <div className={styles.productsList}>
        {cart.map((cartItem, index) => (
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

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
        </div>
        {cupomDiscount > 0 && (
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Desconto</div>
            <div className={styles.resumeRight}>-{formatter.formatPrice(cupomDiscount)}</div>
          </div>
        )}
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
          </div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor }}>
            {formatter.formatPrice(subtotal - cupomDiscount + shippingPrice)}
          </div>
        </div>
        <div className={styles.resumeButton}>
          <Button label="Finalizar Pedido" onClick={handleFinish} fill disabled={!shippingAddress} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

type Props = {
  tenant: Tenant;
  user: User | null;
  token: string;
  cart: CartItem[];
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

  // Get Cart Products
  const cartCookie = getCookie('cart', context);
  const cart = await api.getCartProducts(cartCookie as string);

  return {
    props: {
      tenant,
      user,
      token,
      cart,
    },
  };
};
