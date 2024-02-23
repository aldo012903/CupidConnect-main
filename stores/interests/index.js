import { defineStore } from 'pinia'

export const useInterestsStore = defineStore('interests', {
  state: () => ({
    interests: [],
  }),
  actions: {
    setInterests(interests) {
      this.interests = interests;
    },
    getInterests(){
        return this.interests
    },
    getInterestsById(id){
        try{
            return this.interests.find(interest => interest._id === id).name;
        }catch(error){
            
            return ;
        }
    }
  },
})