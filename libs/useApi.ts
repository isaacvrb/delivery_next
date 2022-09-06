import { Product } from '../types/Product';
import { Tenant } from '../types/Tenant';
import { User } from '../types/User';

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/tmp/burger.png',
    categoryName: 'Tradicional',
    name: 'Texas Burger',
    price: 25.5,
    description:
        '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal',
};

export const useApi = (tenantSlug: string) => ({
    getTenant: (): boolean | Tenant => {
        switch (tenantSlug) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7Burger',
                    mainColor: '#FB9400',
                    secondColor: '#FFF9F2',
                };
                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0',
                };
                break;
            default:
                return false;
        }
    },

    getAllProducts: () => {
        let products = [];
        for (let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1,
            });
        }
        return products;
    },

    getProduct: (id: number) => {
        return { ...TEMPORARYoneProduct, id };
    },

    authorizeToken: async (token: string): Promise<User | null> => {
        if (!token) return null;

        return {
            name: 'Isaac',
            email: 'isaacbh0297@gmail.com',
        };
    },
});
