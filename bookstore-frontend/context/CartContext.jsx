"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = { items: [] }; // [{ id, title, price, image, qty }]

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty }] };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "CLEAR":
      return { items: [] };
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Rehydrate from localStorage (map legacy "quantity" -> "qty")
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) {
          const normalized = {
            items: parsed.items.map((it) => ({
              ...it,
              qty: typeof it.qty === "number" ? it.qty : (it.quantity ?? 1),
            })),
          };
          dispatch({ type: "SET", payload: normalized });
        }
      }
    } catch {}
  }, []);

  // Persist to localStorage (even when empty, so badge clears)
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => {
    const totalCount = state.items.reduce((n, it) => n + it.qty, 0);
    const totalAmount = state.items.reduce(
      (sum, it) => sum + it.qty * (it.price || 0),
      0
    );

    return {
      items: state.items,
      totalCount,
      totalAmount,
      addToCart: (item, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } }),
      updateQuantity: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", payload: { id } }),
      clearCart: () => dispatch({ type: "CLEAR" }),

      // Back-compat shims (so older components keep working)
      getCartCount: () => totalCount,
      getCartTotal: () => totalAmount,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
