import { state } from "@angular/animations";
import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { Product } from "src/app/models/product.model";
import * as CartAction from './cart.action'

export const initialState: Product[] = []

export const reducer = createReducer(
    initialState,
    on(CartAction.getCart, state => state),
    on(CartAction.getCartSuccess, (_, action) => [...action.products]),

    on(CartAction.addProduct, state => [...state]),
    on(CartAction.addProductSuccess, (state, action) => {
        const stateClone: Product[] = [...state]
        stateClone.push(action.product)
        return stateClone
    }),

    on(CartAction.decreaseProduct, state => [...state]),
    on(CartAction.decreaseProductSuccess, (state, action) => {
        let stateClone: Product[] = [...state]
        const found = stateClone.find(p => p.id === action.product.id);
        if (found) {
            stateClone.splice(stateClone.indexOf(found), 1)
        }
        return stateClone
    }),

    on(CartAction.removeProduct, state => [...state]),
    on(CartAction.removeProductSuccess, (state, action) => {
        let stateClone: Product[] = [...state]
        stateClone = stateClone.filter(p => p.id !== action.product.id)
        return stateClone
    }),

    on(CartAction.clearCartSuccess, state => []),
)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        if(action.type === INIT || action.type === UPDATE) {
            const storageValue = localStorage.getItem('state')
            if(storageValue) {
                try {
                    return JSON.parse(storageValue)
                } catch {
                    localStorage.removeItem('state')
                }
            }
        }
        const nextState = reducer(state, action)
        localStorage.setItem('state', JSON.stringify(nextState))
        return nextState
    }
}