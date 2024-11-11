<script setup lang="ts">

</script>

<template>
  <v-app id="auth">
    <v-app-bar elevation="0">
      <v-app-bar-title>
        <span class="font-bold text-primary text-h5"> {{ 'Ying' }}</span>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
        <v-row no-gutters>
          <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center position-relative">
            <div class="d-flex w-100 h-100">
              <v-img class="pa-2" :width="520" src="/images/login.svg"></v-img>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-flex flex-column">
            <div class="d-flex align-center justify-center h-100">
              <v-card variant="flat" class="w-100 mt-0 px-4 pt-12" max-width="500">
                <v-card-text class="pb-0 mb-6">
                  <slot></slot>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>
