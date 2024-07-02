import { defineStore } from "pinia";
import { ref } from "vue";
import { type GeoJSONStoreFeatures } from "terra-draw";

export const useFeaturesStore = defineStore('features', () => {
  const features = ref<GeoJSONStoreFeatures[]>([]);

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