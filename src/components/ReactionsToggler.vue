<template>
  <div class="reactions-toggler">
    <button
      class="like-btn"
      :class="userReaction === true ? 'active' : ''"
      @click="changeUserReaction(true)"
    >
      <div class="like-icon">
        <img
          v-if="userReaction === true"
          src="/icons/like-icon-active.svg"
          alt="like-icon-active"
        />
        <img v-else src="/icons/like-icon.svg" alt="like-icon" />
      </div>

      <div class="fz-14">Like</div>

      <div class="like-btn-count">{{ reactions.likes }}</div>
    </button>

    <button
      class="dislike-btn"
      :class="userReaction === false ? 'active' : ''"
      @click="changeUserReaction(false)"
    >
      <div class="dislike-icon">
        <img
          v-if="userReaction === false"
          src="/icons/dislike-icon-active.svg"
          alt="dislike-icon"
        />
        <img v-else src="/icons/dislike-icon.svg" alt="like-icon" />
      </div>

      <div class="fz-14">Trash</div>

      <div class="dislike-btn-count">{{ reactions.dislikes }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userReaction = ref<boolean | null>(null);

const reactions = ref({
  likes: 192,
  dislikes: 25,
});

const changeUserReaction = (newValue: boolean) => {
  if (newValue === userReaction.value) {
    userReaction.value = null;
    return;
  }

  userReaction.value = newValue;
};
</script>

<style scoped lang="scss">
.reactions-toggler {
  display: flex;
  flex-wrap: nowrap;
}

.like-btn,
.dislike-btn {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5.5px 10px;
  background: var(--grey-2-color);
  border-radius: 30px;
  border: none;
  cursor: pointer;
  min-width: 91px;
}

.like-btn {
  margin-right: 1px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;

  &.active {
    color: #ffffff;
    background: var(--red-color);

    .like-btn-count {
      color: #ffffff;
      opacity: 1;
    }
  }
}

.dislike-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  &.active {
    color: #ffffff;
    background: var(--black-color);

    .dislike-btn-count {
      color: #ffffff;
      opacity: 1;
    }
  }
}

.like-icon,
.dislike-icon {
  width: 13px;
  height: 11px;
  margin-right: 4px;
}

.like-btn-count,
.dislike-btn-count {
  margin-left: 6px;
  color: #040405;
  opacity: 30%;
}
</style>
