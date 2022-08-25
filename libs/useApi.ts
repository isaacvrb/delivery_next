import { Product } from '../types/Product';
import { Tenant } from '../types/Tenant';
import { User } from '../types/User';

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/tmp/burger.png',
    categoryName: 'Tradicional',
    name: 'Texas Burger',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

export const useApi = (tenantSlug: string) => ({
    
    getTenant: (): boolean | Tenant => {
        switch(tenantSlug) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7Burger',
                    mainColor: '#FB9400',
                    secondColor: '#FFF9F2'
                }
            break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#0000ff',
                    secondColor: '#00ff00'
                }
            break;
            default: return false;
        }
    },

    getAllProducts: () => {
        let products = [];
        for(let q = 0; q < 10; q++) {
            products.push(TEMPORARYoneProduct);
        }
        return products;
    },

    getProduct: (id: string) => {
        return TEMPORARYoneProduct;
    },

    authorizeToken: async (token: string): Promise<User | null> => {
        if(!token) return null;

        return {
            name: 'Isaac',
            email: 'isaacbh0297@gmail.com'
        }
    }

})