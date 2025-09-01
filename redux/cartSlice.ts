import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

const listCart = [
  {
    id: '1',
    name: 'Dining Chair 0073 WF MG-01',
    price: 180000,
    quantity: 1,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/prod1-300x300.png'
  },
  {
    id: '2',
    name: 'Lori Leather Otto man Site w/Tray',
    price: 490000,
    quantity: 1,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/mora-300x300.png'
  },
  {
    id: '3',
    name: 'Leather Singint Tols In Canada Chair',
    price: 280000,
    quantity: 1,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/new-schair-300x300.png'
  }
]

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: listCart,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity = action.payload.quantity
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer