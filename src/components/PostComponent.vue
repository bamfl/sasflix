<template>
  <div>
    <div class="text-h2 fw-700 mb-xs">His mother had always taught him</div>

    <div class="text-h3 mb-md">
      His mother had always taught him not to ever think of himself as better
      than others. He'd tried to live by this motto. He never looked down on
      those who were less fortunate or who had less money than him. But the
      stupidity of the group of people he was talking to made him change his
      mind.
    </div>

    <div class="row items-center">
      <ReactionsToggler class="mr-xs" />

      <button class="underlined-btn accent-color mr-xs">Open comments</button>

      <div class="grey-1-color mr-xs">Today</div>

      <div class="row">
        <div class="tag first mr-xxs">history</div>
        <div class="tag mr-xxs">american</div>
        <div class="tag mr-xxs">crime</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReactionsToggler from './ReactionsToggler.vue';
</script>

<style lang="scss"></style>
