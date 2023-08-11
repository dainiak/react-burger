import {IStore} from "../../declarations/store";

export const selectOrderNumber = (store: IStore) => store.order.number;

export const selectOrder= (store: IStore) => store.order;