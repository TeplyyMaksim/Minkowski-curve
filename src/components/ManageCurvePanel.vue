<template>
  <div class="manage-curve-container">
    <h3 class="manage-curve-iterator">Iteration: {{iteration}}</h3>
    <fish-buttons>
      <fish-button :disabled="disabled" size="big" type="positive" @click="showIterationModal = true">Add iterations <i class="fa fa-plus"></i></fish-button>
      <fish-button :disabled="disabled" size="big" type="negative" @click="$emit('clear')">Reset <i class="fa fa-times" /></fish-button>
    </fish-buttons>
    <fish-modal title="Manage iteration" :visible.sync="showIterationModal">
      <fish-form inline class="iteration-form">
        <fish-field label="Add iterations">
          <fish-field inline>
            <fish-input-number v-model="addInput"></fish-input-number>
            <fish-button class="mark-btn" @click="addIterations"><i class="fa fa-plus"></i></fish-button>
          </fish-field>
        </fish-field>
        <!-- <fish-field label="Remove iterations">
          <fish-field inline>
            <fish-input-number v-model="removeInput"></fish-input-number>
            <fish-button class="mark-btn" @click="removeIterations"><i class="fa fa-minus"></i></fish-button>
          </fish-field>
        </fish-field> -->
      </fish-form>
    </fish-modal>
  </div>
</template>

<script>
export default {
  props: ['iteration', 'disabled'],
  data() {
    return {
      showIterationModal: false,
      addInput: null,
      removeInput: null
    }
  },
  methods: {
    addIterations() {
      if (this.addInput) {
        this.$emit('manage-iteration', this.addInput);
        this.addInput = null;
        this.showIterationModal = false;
      }
    },

    removeIterations() {
      if (this.removeInput) {
        this.$emit('manage-iteration', -this.removeInput);
        this.removeInput = null;
        this.showIterationModal = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-curve-container {
  display: flex;
  align-items: center;

  .manage-curve-iterator {
    margin: 0 1em 0 0;
  }

  .iteration-form {
    display: flex;
    justify-content: space-around;

    .mark-btn {
      margin-left: 1em;
    }
  }
}
</style>
