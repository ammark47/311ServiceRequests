<template>
    <div class='customfilter'>
            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="NYPD"
            type="is-danger">
            <span>New York Police Department</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DSNY"
            type="is-success">
            <span>Department of Sanitation</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DPR">
            <span>Dep of Parks and Rec</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="EDC">
            <span>Economic Dev Corp</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOT">
            <span>Dep of Transportation</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOHMH">
            <span>Dep of Health and Mental Hygiene</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DHS">
            <span>Dep of Homeless Services</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="TLC">
            <span>Taxi and Limo Commis</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOITT">
            <span>LinkNYC Unit</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DEP">
            <span>Dep of Environ Protection</span>
            </b-checkbox-button>

        
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


