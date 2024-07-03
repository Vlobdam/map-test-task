<script setup lang="ts">
  import { useFeaturesStore } from '@/stores/feature';
  import { capitalize } from '@/utils/capitalize';
  const { features } = useFeaturesStore();

//[ { "id": "456ab8fe-5588-4b6c-b21a-09cd180559ac", "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [ [ [ -25.13671875, -53.540307392 ], [ 4.04296875, -60.930432203 ], [ 23.37890625, -40.97989807 ], [ -7.20703125, -28.613459424 ], [ -25.13671875, -53.540307392 ] ] ] }, "properties": { "mode": "polygon" } }, { "id": "6b266346-db3d-4acb-a7cb-49eb9b1e1561", "type": "Feature", "geometry": { "type": "LineString", "coordinates": [ [ -87.890625, -0.878871783 ], [ -33.3984375, 12.382928338 ] ] }, "properties": { "mode": "linestring" } }, { "id": "8deb6704-94e4-451c-be65-3f1643b290f0", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -149.0625, -52.589700769 ] }, "properties": { "mode": "point" } }, { "id": "6dec077f-024d-447f-ab83-80eeb3d3be22", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -118.828125, -53.644637825 ] }, "properties": { "mode": "point" } }, { "id": "7bdbcce8-d568-421e-9f98-e5c20c69834e", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -160.3125, 30.902224705 ] }, "properties": { "mode": "point" } }, { "id": "c0acb5cd-8621-4dd3-bc12-1b500dd05aed", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -81.2109375, 24.367113563 ] }, "properties": { "mode": "point" } }, { "id": "4e9c06a1-4224-4901-b824-f4546172e51d", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -11.953125, 51.727028157 ] }, "properties": { "mode": "point" } }, { "id": "32c8e3dd-798d-4634-be32-fdfc1a094b7c", "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -11.953125, 51.727028157 ] }, "properties": { "mode": "point" } }, { "id": "f41fc480-6ad8-4354-b751-243301c1ed22", "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [ [ [ -80.859375, 37.300275281 ], [ -80.859375, 37.300275281 ], [ -80.859375, 37.300275281 ], [ -67.1484375, 47.872143969 ], [ -60.1171875, 50.176898122 ], [ -52.03125, 48.806863461 ], [ -33.3984375, 47.635783591 ], [ -36.5625, 53.8525266 ], [ -42.890625, 60.500525411 ], [ -34.8046875, 54.059387887 ], [ -28.828125, 49.037867945 ], [ -25.3125, 43.961190639 ], [ -24.609375, 25.324166526 ], [ -17.9296875, 19.808054128 ], [ -4.5703125, 19.145168196 ], [ 4.921875, 20.138470312 ], [ -80.859375, 37.300275281 ] ] ] }, "properties": { "mode": "freehand" } } ]

  const formatCoordinates = (coordinates: number[] | number[][] | number[][][]) => {
    return coordinates.join(', ')
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
        <td class='w-[200px] ml-[10px] text-center'> {{ formatCoordinates(feature.geometry.coordinates) }} </td>
      </tr>
    </table>
  </div>
</template>
