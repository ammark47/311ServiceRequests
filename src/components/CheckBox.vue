<template>
  <div class="checkbox">
    <section>
        <div class="field">
            <b-checkbox>Basic</b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="checkbox">
                {{ checkbox }}
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox disabled>Disabled</b-checkbox>
        </div>
    </section>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data() {
            return {
                checkbox: false,
                checkboxCustom: 'Yes'
            }
        }
    }
</script>
