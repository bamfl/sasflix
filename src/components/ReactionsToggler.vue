<template>
  <div class="reactions-toggler">
    <button
      class="like-btn"
      :class="props.post.userReaction === true ? 'active' : ''"
      @click="changeUserReaction(true)"
    >
      <div class="like-icon">
        <img
          v-if="props.post.userReaction === true"
          src="/icons/like-icon-active.svg"
          alt="like-icon-active"
        />
        <img v-else src="/icons/like-icon.svg" alt="like-icon" />
      </div>

      <div class="fz-14">Like</div>

      <div class="like-btn-count">{{ props.post.reactions.likes }}</div>
    </button>

    <button
      class="dislike-btn"
      :class="props.post.userReaction === false ? 'active' : ''"
      @click="changeUserReaction(false)"
    >
      <div class="dislike-icon">
        <img
          v-if="props.post.userReaction === false"
          src="/icons/dislike-icon-active.svg"
          alt="dislike-icon"
        />
        <img v-else src="/icons/dislike-icon.svg" alt="like-icon" />
      </div>

      <div class="fz-14">Trash</div>

      <div class="dislike-btn-count">{{ props.post.reactions.dislikes }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/postsStore';
import type { IPost } from '@/types';

const props = defineProps<{
  post: IPost;
}>();

const postsStore = usePostsStore();

const { updateReactions } = postsStore;

const changeUserReaction = (newUserReaction: boolean) => {
  // Same btn click
  if (newUserReaction === props.post.userReaction) {
    const newReactions = { ...props.post.reactions };

    if (newUserReaction === true) {
      newReactions.likes -= 1;
    } else {
      newReactions.dislikes -= 1;
    }

    updateReactions(props.post.id, newReactions, null);

    return;
  }

  // Another btn click
  if (newUserReaction === true) {
    const isDislikeBtnActive = props.post.userReaction === false;

    updateReactions(
      props.post.id,
      {
        dislikes: isDislikeBtnActive
          ? props.post.reactions.dislikes - 1
          : props.post.reactions.dislikes,
        likes: props.post.reactions.likes + 1,
      },
      newUserReaction,
    );
  } else if (newUserReaction === false) {
    const isLikeBtnActive = props.post.userReaction === true;

    updateReactions(
      props.post.id,
      {
        likes: isLikeBtnActive
          ? props.post.reactions.likes - 1
          : props.post.reactions.likes,
        dislikes: props.post.reactions.dislikes + 1,
      },
      newUserReaction,
    );
  }
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
  align-items: center;
  flex-wrap: nowrap;
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
  font-size: 14px;
}
</style>
