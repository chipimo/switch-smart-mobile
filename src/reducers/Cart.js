const CartReducer = (
  state = { cart: "0", productId: {}, id: "cart" },
  action
) => {
  switch (action.type) {
    case "AddItem":
      state = {
        cart: action.playload.cartNum,
        productId: action.playload.productId
      };
      return state;
    case "RemoveItem":
      state = {
        cart: action.playload.cartNum,
        productId: action.playload.productId
      };
      return state;

    default:
      return state;
  }
};

export default CartReducer;
