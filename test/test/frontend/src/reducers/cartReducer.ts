import { debounce } from "lodash";
import { updateCartItem, addToCart, removeFromCart } from "../components/API/cart";

const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";
const CLEAR_CART = "CLEAR_CART";

export const setCartItems = (cartItems: CartItem[]): cartActionType => ({
  type: "SET_CART_ITEMS",
  payload: cartItems,
});

export const clearCart = (): cartActionType => ({
  type: CLEAR_CART,
  payload: null,
});

export const cartInitialState = {
  cartList: [],
};

export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
  justification: string;
};

export type cartStateType = {
  cartList: CartItem[];

};

export type cartActionType =
  | {
      type: typeof CHANGE_CART_AMOUNT;
      payload: CartItem;
    
    }
  | {
      type: "SET_CART_ITEMS";
      payload: CartItem[];
    }
  | {
        type: typeof CLEAR_CART;
        payload: null;
    };


const updateCartInDatabase = debounce(async (cartItem: CartItem) => {
  try {
    if (cartItem.qty < 1) {
      await removeFromCart(cartItem.id);
    } else {
      const existingCartItem = await updateCartItem(cartItem.id, cartItem);
      if (!existingCartItem) {
        await addToCart(cartItem);
      }
    }
  } catch (error) {
    console.error("Failed to update cart in database:", error);
  }
}, 1000); // 1 second debounce time

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList; // Update this line
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        newState = {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        };
      } else if (exist) {
        newState = {
          cartList: cartList.map((item) => {
            if (item.id === cartItem.id) return { ...item, qty: cartItem.qty };
            else return item;
          }),
        };
      } else {
        newState = {
          cartList: [...cartList, cartItem],
        };
      }

      break;

    case "SET_CART_ITEMS":
      newState = {
        cartList: action.payload as CartItem[],
      };
      break;

    case CLEAR_CART:
      console.log("Handling CLEAR_CART");
      newState = {
        cartList: [],
      };
      break;

    default:
      break;
  }

  console.log("New state:", newState); // Add this line here

  if (action.type === CHANGE_CART_AMOUNT) {
    // Call the debounced function to update the cart in the database
    updateCartInDatabase(action.payload);
  }

  return newState;
};

