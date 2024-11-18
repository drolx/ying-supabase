<template>
    <div>
        <v-row justify="space-between" class="px-4">
            <p class="font-weight-bold">Active Shipments</p>
            <v-menu :location="location">
            <template v-slot:activator="{ props }">
                <p class="font-weight-bold" v-bind="props">All<span><v-icon icon="mdi-chevron-down" size="large"></v-icon></span></p>
            </template>

            <v-list class="w-[200px]">
                <v-list-item class="cursor-pointer hover:bg-light">All</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">Pending</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">In Transit</v-list-item>
                <v-list-item class="cursor-pointer hover:bg-light">Delivered</v-list-item>                  
            </v-list>
            </v-menu>
        </v-row>
        <v-container class="pa-0 w-100 mt-6 h-[250px] overflow-y-scroll">
            <div v-for="(_, n) in 8" :key="n" class="border-md position-relative rounded-md pa-3 mb-3 flex">
            <div class="w-[50px] h-[50px]">
                <v-img src="/images/delivery-truck.png" class=""></v-img>
            </div>
            <div class=" ml-4 w-75">
                <p class="font-bold text-xl">Shipment #672</p>
                <p class="text-xs mt-2">Delivery Address: No. 5 Upper Iweka road, Onitsha, Anambra </p>
                <p class="text-xs mt-2">Weight: 56kg | Category: Fragile | Contact: 08133454547(James...) </p>
            </div>
            <v-chip label class="position-absolute right-3 bg-primary">
                In Transit
            </v-chip>
            </div>
        </v-container>
    </div>
</template>