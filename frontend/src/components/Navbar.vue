<template>
    <nav>
        <v-toolbar flat app color="indigo">
            <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <!-- <v-btn flat color="grey">
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn> -->
            <v-toolbar-title class="text-uppercase white--text">
                <span class="font-weight-light"> Doc</span>
                <span>Editor</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="indigo lighten-1">
            <v-list>
                <v-list-tile v-for="link in drawerLinks" :key="link.text" route :to="link.path">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>


<script> 
 
export default {
    data(){
        return {
            drawer: false,
            drawerLinks: [
                { icon:"dashboard", text: "Dashboard", path:"/"},
                // { icon:"edit", text: "Editor", path:"/editor"},
                // { icon:"remove_red_eye", text: "Preview", path:"/preview"},
                { icon:"more_vert", text: "More", path:"/settings"}
            ]
        }
    }
}
</script>

