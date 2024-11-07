<template>
    <v-container>
        <v-row align="center" justify="center" class="mt-12">
            <h1 class="">Here is the list of the currently available categories.</h1>
        </v-row>

        <v-list class="mt-8">
            <v-list-item class="cursor-pointer">
                <NuxtLink to="/technology">
                    Technology
                    <v-tooltip activator="parent" location="end">view articles</v-tooltip>
                </NuxtLink>
            </v-list-item>
            
            <v-list-item class="cursor-pointer">
                <NuxtLink to="/health">
                    Health
                    <v-tooltip activator="parent" location="end">view articles</v-tooltip>
                </NuxtLink>
            </v-list-item>

            <v-list-item class="cursor-pointer">
                <NuxtLink to="/lifestyle">
                    Lifestyle
                    <v-tooltip activator="parent" location="end">view articles</v-tooltip>
                </NuxtLink>
            </v-list-item>

        </v-list>    

    </v-container>
</template>

<script>


</script>

<style>

</style>