import { defineStore } from "pinia";
import { ref } from "vue";
import { type GeoJSONStoreFeatures } from "terra-draw";
import defaultFeatures from '../defaultFeatures.json'; 

export const useFeaturesStore = defineStore('features', () => {
  const features = ref<GeoJSONStoreFeatures[]>(defaultFeatures as GeoJSONStoreFeatures[]);

  const addFeature = (feature: GeoJSONStoreFeatures) => {
    features.value.push(feature);
  };

  const setFeatures = (newFeatures: GeoJSONStoreFeatures[]) => {
    features.value = newFeatures;
  };

  const resetFeatures = () => {
    setFeatures([])
  };
  

  return {
    features,
    resetFeatures,
    addFeature,
    setFeatures
  };  
});