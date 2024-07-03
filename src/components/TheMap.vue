<script setup lang="ts">
  import {
    TerraDraw,
    TerraDrawMapLibreGLAdapter,
    TerraDrawFreehandMode,
    TerraDrawPointMode,
    TerraDrawPolygonMode,
  } from 'terra-draw';
  import mapLibreGL from 'maplibre-gl';
  import { nextTick, ref } from 'vue';
  import { useFeaturesStore } from '@/stores/feature';
  import { capitalize } from '@/utils/capitalize';

  const { features, setFeatures  } = useFeaturesStore();
  const selectedMode = ref('static');

  const freehand = new TerraDrawFreehandMode();
  const point = new TerraDrawPointMode();
  const polygon = new TerraDrawPolygonMode();

  const modes = [freehand, point, polygon];

  let draw: TerraDraw;

  nextTick(() => {
    const map = new mapLibreGL.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 1,
      maplibreLogo: false,
    })

    map.removeControl(map._controls[0]);

    const adapter = new TerraDrawMapLibreGLAdapter({
      lib: mapLibreGL,
      map: map,
    })

    draw = new TerraDraw({ 
      adapter,
      modes,
    });

    draw.start();

    map.on('load', () => {
      draw.addFeatures(features)  
    })
    
    draw.on('finish', () => {
      setFeatures(draw.getSnapshot());
    })

    
  })
  
  const selectMode = (mode: string) => {
      selectedMode.value = mode;
      draw.setMode(mode);
  }

  </script>

<template>
  <div class='h-[500px] w-[500px]'>
    <div id="map" class='h-full w-full'></div>
  </div>
  
  <div class="flex gap-2">
    <button @click="selectMode('static')">Static</button>
    
    <button 
      v-for="mode in modes"
      :key="mode.mode"
      @click="selectMode(mode.mode)"
    >
      {{ capitalize(mode.mode) }}
    </button>
  </div>
</template>