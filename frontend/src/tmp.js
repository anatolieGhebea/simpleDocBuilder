<div v-for="(lv2, key1) in lv1" :key="key1">
<div v-if="isSubSection(key1)">
    <!-- subsection found -->
    <div class="px-3 subsection">
        <h2>
            <input 
                v-bind:id="key1"
                v-model="lv2.title"
                @blur="updateEl"
            />
        </h2>
        
        <div v-for="(lv3, key2) in lv2" :key="key2">
            <div v-if="isParagrph(key2)" class="px-2 paragraph">
                <p>
                    <textarea 
                        v-bind:id="key2"
                        v-model="lv3.content"
                        @blur="updateEl"
                        @change="auto_grow($event)"
                    />
                </p>
                <div class="action-btn">
                    <v-spacer></v-spacer>
                    <v-btn v-bind:id="key2" small icon class="red--text" @click="rmEl(key2)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>

        <div class="action-btn">
            <v-btn v-bind:id="key1" small flat class="blue--text" @click="addNewEl(key1, paragraph)">
                <v-icon>add_circle_outline</v-icon>
                <span>paragraph</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-bind:id="key1" small icon class="red--text" @click="rmEl(key1)">
                <v-icon>delete</v-icon>
            </v-btn>
        </div>

    </div>
</div>
<div v-else-if="isParagrph(key1)">
    <!-- paragraph found -->
    <div class="mt-1 px-1 paragraph"> 
        <p> 
            <textarea
                v-bind:id="key1"
                v-model="lv2.content"
                @blur="updateEl"
                @change="auto_grow($event)"
            />
        </p>
        <div class="action-btn">
            <v-spacer></v-spacer>
            <v-btn v-bind:id="key1"  small  icon  class="red--text" @click="rmEl(key1)">
                <v-icon>delete</v-icon>
            </v-btn>
        </div>
    </div>
</div>

</div>

<div class="action-btn">
<v-btn v-bind:id="key" small flat class="blue--text" @click="addNewEl(key, subsection)">
    <v-icon>add</v-icon>
    <span>SubSection</span>
</v-btn>
<v-btn v-bind:id="key" small flat class="blue--text" @click="addNewEl(key, paragraph)">
    <v-icon>add_circle_outline</v-icon>
    <span>paragraph</span>
</v-btn>
<v-spacer></v-spacer>
<v-btn v-bind:id="key" small icon class="red--text" @click="rmEl(key)">
    <v-icon>delete</v-icon>
</v-btn>
</div>
</div>