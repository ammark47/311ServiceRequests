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

<style scoped>
.b-checkbox.checkbox {
  outline: none;
  display: -webkit-inline-box;
  align-items: center;
  margin-bottom: 5px;
  font-size: 10px;
  text-transform: uppercase;
  float: left;
  height: 36px;
  margin-right: 5px;
}

</style>

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
