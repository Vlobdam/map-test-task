<script setup lang="ts">
  import {
    TerraDraw,
    TerraDrawMapLibreGLAdapter,
    TerraDrawFreehandMode,
    TerraDrawPointMode,
    TerraDrawPolygonMode,
    TerraDrawLineStringMode,
  } from 'terra-draw';
  
  import mapLibreGL from 'maplibre-gl';
  import { nextTick, ref } from 'vue';
  import { useFeaturesStore } from '@/stores/feature';
  import { capitalize } from '@/utils/capitalize';

  const { features, setFeatures  } = useFeaturesStore();
  const selectedMode = ref('static');

  const modes = [
  	new TerraDrawPointMode(),
  	new TerraDrawLineStringMode(),
  	new TerraDrawPolygonMode(),
  	new TerraDrawFreehandMode()
	];

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

  const getModeButtonClass = (mode) => {
  	return `${mode === selectedMode.value 
  		? 'bg-[#DDD]' 
  		: 'bg-[#FFF]'
  	}`
  }



  </script>

<template>
	<div class='flex h-full'>
	  <div class='h-full w-[calc(100%-250px)]'>
	    <div id="map" class='h-full w-full'></div>

	    <div class="absolute bottom-2 left-2 flex gap-2">
		    <button 
		    	class='border-2 border-black border-solid'
		    	:class="getModeButtonClass('static')"
		    	@click="selectMode('static')">
		    	Static
		   	</button>
		    
		    <button 
		    	class='border-2 border-black border-solid'
		    	:class='getModeButtonClass(mode.mode)'
		      v-for="mode in modes"
		      :key="mode.mode"
		      @click="selectMode(mode.mode)"
		    >
		      {{ capitalize(mode.mode) }}
		    </button>
		  </div>
	  </div>

	  <form class='w-[250px]'>
	  	<input type="" name="">
	  </form>
	</div>
</template>