<script setup lang="ts">
  import {TerraDraw, TerraDrawMapLibreGLAdapter, TerraDrawFreehandMode, TerraDrawPointMode, } from 'terra-draw';
  import mapLibreGL from 'maplibre-gl';
  import { nextTick } from 'vue';

  const freeHand = new TerraDrawFreehandMode();
  const point = new TerraDrawPointMode();

  nextTick(() => {
  const adapter = new TerraDrawMapLibreGLAdapter({
    lib: mapLibreGL,
    map: new mapLibreGL.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 1,
      maplibreLogo: false,
    }),
  })

  const draw = new TerraDraw({ 
    adapter,
    modes: [freeHand, point]
  });

  draw.start();
  draw.setMode('freehand');
  })
  
</script>

<template>
  <div class='h-[500px] w-[500px]'>
  <div id="map" class='h-full w-full'></div>
  </div>
</template>