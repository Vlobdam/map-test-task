<script setup lang="ts">
  import {
    TerraDraw,
    TerraDrawMapLibreGLAdapter,
    TerraDrawFreehandMode,
    TerraDrawPointMode,
    TerraDrawPolygonMode,
    TerraDrawLineStringMode,
  } from 'terra-draw';
  
  import mapLibreGL, {type Map} from 'maplibre-gl';
  import { nextTick, ref } from 'vue';
  import { useFeaturesStore } from '@/stores/feature';
  import { capitalize } from '@/utils/capitalize';
  import { saveAs } from 'file-saver';

  const { features, setFeatures } = useFeaturesStore();
  const selectedMode = ref('static');

  const modes = [
  	new TerraDrawPointMode(),
  	new TerraDrawLineStringMode(),
  	new TerraDrawPolygonMode(),
  	new TerraDrawFreehandMode()
	];

  let draw: TerraDraw;
  let map: Map;

  nextTick(() => {
    map = new mapLibreGL.Map({
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

  const getModeButtonClass = (mode: string) => {
  	return `${mode === selectedMode.value 
  		? 'bg-[#DDD]' 
  		: 'bg-[#FFF]'
  	}`
  }

  const changeOpacity = (opacity: string) => {
    map.setPaintProperty('td-polygon', 'fill-opacity', Number(opacity));
  }

  const changeBorderColor = (color: string) => {
    map.setPaintProperty('td-point', 'circle-color', color);
    map.setPaintProperty('td-linestring', 'line-color', color);
    map.setPaintProperty('td-polygon-outline', 'line-color', color);
  }

  const changeFillColor = (color: string) => {
    map.setPaintProperty('td-polygon', 'fill-color', color);
  }

  const handleExport = () => {
  	const jsonString = JSON.stringify(draw.getSnapshot());
  	const blob = new Blob([jsonString], {type: 'application/geo+json'})

  	saveAs(blob, 'file.geojson');
  };
</script>

<template>
	<div class='flex row h-full'>
	  <div class='h-full w-[calc(100%-250px)]'>
	    <div id="map" class='h-full w-full'></div>

	    <div class="absolute bottom-2 left-2 flex gap-2">
		    <button 
		    	class='border-2 border-black border-solid'
		    	:class="getModeButtonClass('static')"
		    	@click="selectMode('static')"
		    	>
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

	  <div class='w-[250px] p-4'>
      <h2 class='font-bold mb-4'>Settings: </h2>

      <div>
        <label for="opacity">Body Opacity:</label>
        
        <input 
          type="range"
          id='opacity'
          name="opacity"
          min="0"
          max="1"
          step='0.1'
          defaultValue="0.7"
          @input="event => changeOpacity((event.target as HTMLInputElement).value)"
          >     
      </div>

      <div class='flex flex-col '>
        <label for='body-color'>Body Color: </label>
        
        <input 
          id='body-color'
          type="color"
          name="body-color"
          defaultValue="#3f97e0"
          @input="event => changeFillColor((event.target as HTMLInputElement).value)"
        >
      </div>     

      <div class='flex flex-col '>
        <label for='color'>Border Color: </label>
        
        <input 
          id='color' 
          type="color" 
          name="color"
          defaultValue="#3f97e0"
          @input="event => changeBorderColor((event.target as HTMLInputElement).value)"
        >
      </div>

      <button 
      @click='handleExport'
      class='border-2 border-black border-solid mt-2 text-center p-2'
      >
        Export   
      </button>
	  </div>
	</div>
</template>