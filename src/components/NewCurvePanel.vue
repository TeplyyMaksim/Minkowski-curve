<template>
  <div>
    <fish-buttons>
      <fish-button
        size="big"
        type="positive"
        @click="showCreateModal = true">
        Generate
        <i class="fa fa-cogs"/>
      </fish-button>
      <fish-button
        size="big"
        type="basic"
        @click="$emit('generate', { x: 500, y: 250, iterations: 10 })">
        Autogenerate
        <i class="fa fa-bolt" />
      </fish-button>
    </fish-buttons>
    <fish-modal title="Generate new curve" :visible.sync="showCreateModal">
      <fish-form inline class="generate-form">
        <fish-field label="Iterations number:">
          <fish-input-number v-model="iterations"></fish-input-number>
        </fish-field>
        <fish-field label="Center coordinates">
          <fish-field inline>
            <fish-input-number v-model="x" hint="x"></fish-input-number>
            <fish-input-number v-model="y" hint="y"></fish-input-number>
          </fish-field>
        </fish-field>
        <fish-button type="positive" size="big" @click="generate">Generate</fish-button>
      </fish-form>
    </fish-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCreateModal: false,
      x: null,
      y: null,
      iterations: null
    }
  },

  methods: {
    generate() {
      if ((!this.x && this.x !== 0) || (!this.y && this.y !== 0) || !this.iterations) {
        this.$message.error('You should fill all fields', 2500);
        return;
      }

      this.$emit('generate', {x: this.x, y: this.y, iterations: this.iterations});
      this.showCreateModal = false;
      this.x = this.y = this.iterations = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.generate-form {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
