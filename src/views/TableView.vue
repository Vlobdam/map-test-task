<script setup lang="ts">
  import { useFeaturesStore } from '@/stores/feature';
  import { capitalize } from '@/utils/capitalize';

  const { features } = useFeaturesStore();

  const formatCoordinates = (geometry) => {
    switch(geometry.type) {
    	case 'Polygon': 
    		return '[' + geometry.coordinates[0].join('], \n[') + ']';
    	default: 
    		return '[' + geometry.coordinates.join('], \n[') + ']'
    }
  }

</script>

<template>
  <div>
    <h1 class='font-extrabold text-center text-3xl'>Features Table </h1>
    <table class='m-[auto]'>
      <tr >
        <th>ID</th>
        <th>Mode</th>
        <th>Coordinates</th>
      </tr>
      <tr  v-for="feature in features" :key="feature.id">
        <td class='w-[200px] ml-[10px] text-center'>{{ feature.id }}</td>
        <td class='w-[200px] ml-[10px] text-center'>{{ capitalize(feature.properties.mode?.toString() || '') }}</td>
        <td class='w-[240px] ml-[10px] text-center'> {{ formatCoordinates(feature.geometry) }} </td>
      </tr>
    </table>
  </div>
</template>
