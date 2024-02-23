import { defineStore } from 'pinia'

export const useOrientationsStore = defineStore('orientations', {

  state: () => ({
    orientations: [],
  }),

  actions: {

    setOrientations(orientations) {
      this.orientations = orientations;
    },
    getOrientations(){
        return this.orientations
    },
    getOrientationsById(id){
        try{
            return this.orientations.find(orientation => orientation._id === id).name;
        }catch(error){
            
            return ;
        }
      
    }
  },
})