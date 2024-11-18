<template>
    <div class="">
        <v-row justify="space-between" class="px-4">
            <p class="font-weight-bold">Active Journeys</p><v-menu :location="location">
            <template v-slot:activator="{ props }">
                <p class="font-weight-bold" v-bind="props">All<span><v-icon icon="mdi-chevron-down" size="large"></v-icon></span></p>
            </template>

            <v-list class="w-[200px] position-relative right-40">
                <v-list-item class="cursor-pointer hover:bg-light">All</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">Upcoming</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">Ongoing</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">Completed</v-list-item>                  
            </v-list>
            </v-menu>
        </v-row>
        <v-container class="pa-0 w-100 mt-6 h-[250px] overflow-y-scroll">
            <div v-for="(_, n) in 8" :key="n" class="border-md position-relative rounded-md pa-3 mb-3 flex">
            <div class="w-[50px] h-[50px]">
                <v-img src="/images/bus.png" class=""></v-img>
            </div>
            <div class=" ml-4 w-75">
                <p class="font-bold text-xl">Bus 31</p>
                <p class="text-xs mt-2">Trip: Lagos - Abuja | Passenger: 56 | Plate No.: ABC-123DE </p>
            </div>
            <v-chip label class="position-absolute right-3 bg-primary">
                Ongoing
            </v-chip>
            </div>
        </v-container>
    </div>
</template>