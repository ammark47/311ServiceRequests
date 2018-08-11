<template>
    <div class='customfilter'>
            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="New%20York%20City%20Police%20Department"
            type="is-danger">
            <span>New York Police Department</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DSNY"
            type="is-success">
            <span>Department of Transportation</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="Ghettos">
            <span>"Ethnic Neighborhoods"</span>
            </b-checkbox-button>

        <p class="content">
            <b>Selection:</b>
            {{ filterGroup.agencyName }}
        </p>
    </div>
    
</template>

<script>
export default {
    name: 'customfilter',
    data() {
        return {
            filterGroup: {
                agencyName: []
            }
        }
    },
    methods: {
        test: function() {
            console.log('test')
        }
    },
    watch: {
        filterGroup: {
            handler: function (group) {
                this.$emit('updateGroup', group);
            },
            deep: true
        }
    },
    props: ['']
}
</script>

<style scoped>

</style>


