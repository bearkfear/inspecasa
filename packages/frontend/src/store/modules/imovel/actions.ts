import { ActionTree } from 'vuex';
import S, { Imovel } from './types';
import mutationTypes from './mutationTypes';
import actionTypes from "./actionTypes";
import { venderImovel } from "@/queries/imovel";
import { VenderImovel } from "./types";


const actions: ActionTree<S, {pay: number}> = {
  async [actionTypes.VENDER_IMOVEL](context, payload: VenderImovel) { 
    try {
      return await venderImovel(payload.id, payload.compradores, payload.valor, payload.situacao || 1);
    } catch (error) {
      console.table("error", error);
    }

  } 
};

export default actions;
