<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String },
  type: { type: String, default: "text" },
  modelValue: { type: String, required: true },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group">
    <label :for="props.name">{{ props.label ?? props.name }}</label>
    <input
      :type="props.type"
      :name="props.name"
      :id="props.name"
      :value="props.modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="props.placeholder"
      :required="props.required"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.form-group {
  position: relative;
  margin-bottom: 40px;
  width: 100%;
}

label {
  position: absolute;
  top: 0;
  left: 20px;
  background: $bg;
  padding: 0 10px;
  transform: translateY(-50%);
  font-weight: 500;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid $grey;
  border-radius: 7px;
  transition: $transition-short;

  &:valid,
  &:focus {
    border-color: $text;
  }
}
</style>
