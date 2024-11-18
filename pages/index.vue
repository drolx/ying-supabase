<script lang="ts" setup>
</script>

<template>
  <div class="py-12">
      <v-row align="center" justify="center">
        <h1 class="">NUXT SUPABASE EXPERIMENT</h1>
      </v-row>
      <v-row align="center" justify="center">
        <NuxtLink to="/categories">
          <v-btn class="my-8" prepend-icon="$vuetify" variant="outlined">
            Categories
          </v-btn>
        </NuxtLink>
      </v-row>

      <v-container class="pt-16 bg-light px-8">
        <v-btn class="bg-primary rounded-lg float-right position-relative left-3" append-icon="mdi-plus" size="large">Create New</v-btn>
        
        <v-row class="my-16 justify-between">
          <v-cols cols="3" class="w-[280px]">
            <v-card class="pa-6 rounded-lg">
              <v-row align="center" justify="space-between">
                <p class="font-bold text-lg">Gross Revenue</p>
                <v-icon class="text-primary" icon="mdi-currency-ngn" size="large"></v-icon>
              </v-row>
              <v-row class="my-8 align-center justify-between">
                <p class="text-xs blue--text">Total:</p>
                <p class="font-bold text-xl"><span class="line-through">N</span>3,068,843.98</p>
              </v-row>
              <v-row justify="space-between">
                <v-cols cols="6" class="pr-2">
                  <p class="text-xs">Mass transit</p>
                  <p class="font-bold"><span class="line-through">N</span>1,539,3456.34</p>
                </v-cols>
                <v-cols cols="6" class="border-s-md pl-2">
                  <p class="text-xs">Logistics</p>
                  <p class="font-bold"><span class="line-through">N</span>1,539,3456.34</p>
                </v-cols>
              </v-row>
            </v-card>
          </v-cols>
          
          <v-cols cols="3" class="w-[250px]">
            <v-card class="pa-6 rounded-lg">
              <v-row align="center" justify="space-between">
                <p class="font-bold text-lg">Journeys</p>
                <v-icon class="text-primary" icon="mdi-road-variant" size="large"></v-icon>
              </v-row>
              <v-row class="my-11 align-center justify-between">
                <p class="text-xs">Ongoing:</p>
                <p class="font-bold text-xl">234</p>
              </v-row>
              <v-row justify="space-between">
                <v-cols cols="6">
                  <p class="font-bold text-xs">Upcoming: <span class="font-normal">14</span></p>
                </v-cols>
                <v-cols cols="6">
                  <p class="font-bold text-xs">Completed: <span class="font-normal">100</span></p>
                </v-cols>
              </v-row>
            </v-card>
          </v-cols>
          
          <v-cols cols="3" class="w-[250px]">
            <v-card class="pa-6 rounded-lg">
              <v-row align="center" justify="space-between">
                <p class="font-bold text-lg">Shipment Overview</p>
                <v-icon class="text-primary" icon="mdi-truck" size="large"></v-icon>
              </v-row>
              <v-row class="my-11 align-center justify-between">
                <p class="text-xs">In Transit:</p>
                <p class="font-bold text-xl">234</p>
              </v-row>
              <v-row justify="space-between">
                <v-cols cols="6">
                  <p class="font-bold text-xs">Pending: <span class="font-normal">100</span> </p>
                </v-cols>
                <v-cols cols="6">
                  <p class="font-bold text-xs">Delivered: <span class="font-normal">10</span> </p>
                </v-cols>
              </v-row>
            </v-card>
          </v-cols>
          
          <v-cols cols="3" class="w-[250px]">
            <v-card class="pa-6 rounded-lg">
              <v-row align="center" justify="space-between">
                <p class="font-bold text-lg">Vehicle Count</p>
                <v-icon class="text-primary" icon="mdi-bus-side" size="large"></v-icon>
              </v-row>
              <v-row class="my-11 align-center justify-between">
                <p class="text-xs">Total:</p>
                <p class="font-bold text-xl">234</p>
              </v-row>
              <v-row justify="space-between">
                <v-cols cols="6">
                  <p class="font-bold text-xs">Active: <span class="font-normal">134</span></p>
                </v-cols>
                <v-cols cols="6">
                  <p class="font-bold text-xs">Inactive: <span class="font-normal">10</span></p>
                </v-cols>
              </v-row>
            </v-card>
          </v-cols>
                  
        </v-row>
  
        <v-row class="my-16" justify="space-between">
          <v-cols cols="6" class="w-[48%] rounded-lg bg-white px-2 pt-8">
            <ActivesJourneys />
          </v-cols>

          <v-cols cols="6" class="w-[48%] rounded-lg bg-white px-2 pt-8">
            <ActivesShipments />
          </v-cols>
        </v-row>
  
        <v-container class="pa-0 my-16">
          <Support />
        </v-container>

      </v-container>

      <v-container class="py-16 border mt-12 bg-light px-8">

        <div>
          <v-card>
            <v-tabs
              v-model="tab"
              bg-color="light"
              class="text-primary font-bold text-xl"
            >
              <v-tab value="one">Overview</v-tab>
              <v-tab value="two">Vehicles</v-tab>
              <v-tab value="three">Inspections</v-tab>
              <v-tab value="four">Contracts</v-tab>
              <v-tab value="five">Categories</v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one" class="pa-12">
                  One 111
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                  Two 222
                </v-tabs-window-item>

                <v-tabs-window-item value="three">
                  Three 333
                </v-tabs-window-item>

                <v-tabs-window-item value="four">
                  four 444
                </v-tabs-window-item>

                <v-tabs-window-item value="five">
                  five 555
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </div>



      </v-container>
  </div>
</template>

<script lang="ts" setup>
const location = ref("bottom");
const tab = ref(null);


</script>

<style>
p {
  color: #002A6F;
}
</style>