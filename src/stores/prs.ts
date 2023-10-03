import { defineStore } from 'pinia';

export const prsStore = defineStore('prs', {
  state: () => ({ prs: [] as Array<any> }),
  getters: {
    getPRs: (state) => state.prs
  },
  actions: {
    setPRs (prs:Array<any>) {
      this.prs = prs;
    }
  }
});
