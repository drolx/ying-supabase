<template>
    <v-row justify="space-between">
        <v-cols cols="6" class="w-[48%] p-0">
            <v-card class="pa-4 rounded-lg">
              <p class="font-bold text-xl">Support/Help Desk</p>
              <v-row class="w-full mt-8 px-4 mb-2" justify="space-between">
                <div class="">
                  <p class="text-sm font-medium">Unresolved complaints</p>
                  <p class="font-bold">234</p>
                </div>
                <div class="border-s-md pl-4">
                  <p class="text-sm font-medium">Inquiries</p>
                  <p class="font-bold">234</p>
                </div>
                <div class="border-s-md pl-4">
                  <p class="text-sm font-medium">Feedback</p>
                  <p class="font-bold">234</p>
                </div>
              </v-row>
            </v-card>

            <v-card class="pa-4 mt-14 rounded-lg">
              <p class="font-bold text-xl">Drivers</p>
              <v-row class="w-full mt-8 px-4 mb-2" justify="space-between">
                <div class="">
                  <p class="text-sm font-medium">All Drivers</p>
                  <p class="font-bold">234</p>
                </div>
                <div class="border-s-md pl-4">
                  <p class="text-sm font-medium">Active</p>
                  <p class="font-bold">234</p>
                </div>
                <div class="border-s-md pl-4">
                  <p class="text-sm font-medium">Inactive/Suspended</p>
                  <p class="font-bold">234</p>
                </div>
              </v-row>
            </v-card>
            
          </v-cols>

          <v-cols cols="6" class="w-[48%]">
            <v-card class="pa-4 rounded-lg">
              <p class="font-bold text-xl">Depot Information</p>

              <div class="my-10">
                <p class="text-sm font-medium">Financial Summary:</p>
                <h3 class="my-2 text-primary">Profit NGN 125,530.00</h3>

                <div>
                  <div class="flex flex-row justify-between align-center w-75">
                    <p class="text-[10px]">Revenue</p>
                    <p class="">NGN 475,530.00</p>
                  </div>
                  <div class="h-4 bg-primary w-75 rounded-r-full"></div>

                  <div class="flex flex-row justify-between align-center mt-2 w-66">
                    <p class="text-[10px]">Expenses</p>
                    <p class="">NGN 350,000.00</p>
                  </div>
                  <div class="h-4 bg-red w-66 rounded-r-full"></div>
                </div>
              </div>



              <v-row class="w-full mt-8 px-4 mb-2" justify="space-between">
                <div class="">
                  <p class="text-sm font-medium">Vehicles In</p>
                  <p class="font-bold">23</p>
                </div>
                <div class="border-s-md pl-2">
                  <p class="text-sm font-medium">Vehicles Out</p>
                  <p class="font-bold">10</p>
                </div>
                <div class="border-s-md pl-2">
                  <p class="text-sm font-medium">Transloading</p>
                  <p class="font-bold">5</p>
                </div>
                <div class="border-s-md pl-2">
                  <p class="text-sm font-medium">Shipments</p>
                  <p class="font-bold">13</p>
                </div>
                <div class="border-s-md pl-2">
                  <p class="text-sm font-medium">Journeys</p>
                  <p class="font-bold">20</p>
                </div>
              </v-row>
            </v-card>
          </v-cols>
        </v-row>
</template>