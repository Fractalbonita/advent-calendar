<template>
  <div>
    <BeerCommentAddForm v-on:new-comment="addComment" v-bind:beer="beer" />
    <div v-if="comments.length === 0">
      <p>
        There are no comments yet. You can leave a comment by tapping the button
        above.
      </p>
    </div>
    <div v-else>
      <ul class="comment__list">
        <li
          v-for="comment in comments"
          v-bind:key="comment.name"
          class="comment__item"
        >
          <div v-if="!isEditing" key="comment-view">
            <h2 class="comment__item_name">{{ comment.name }}</h2>
            <p class="comment__item_post">{{ comment.content }}</p>
            <button
              type="button"
              v-on:click="changeState"
              class="comment__button comment__button--edit"
            >
              Edit
            </button>
            <button
              type="button"
              v-on:click="openModal(comment)"
              class="comment__button comment__button--delete"
            >
              Delete
            </button>
          </div>
          <div v-else-if="isEditing" key="comment-edit">
            <BeerCommentEditForm v-on:exit-edit="changeState" />
          </div>
        </li>
      </ul>
      <BeerCommentDeleteModal
        v-if="open"
        v-bind:close="closeModal"
        v-on:cancel="cancelDelete"
        v-on:delete="deleteComment(comment.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { v4 as uuid } from 'uuid';
import Beer from './Beer';
import Comment from './Comment';
import BeerCommentAddForm from '../components/BeerCommentAddForm.vue';
import BeerCommentEditForm from './BeerCommentEditForm.vue';
import BeerCommentDeleteModal from './BeerCommentDeleteModal.vue';

export default Vue.extend({
  name: 'BeerComment',
  components: {
    BeerCommentAddForm,
    BeerCommentEditForm,
    BeerCommentDeleteModal
  },
  data() {
    return {
      comments: [] as Comment[],
      comment: {} as Comment,
      isEditing: false,
      open: false
    };
  },
  props: {
    beer: { type: Object as PropType<Beer> }
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/comments?beerId=' + this.beer.id)
      .then(res => res.json())
      .then((comments: Comment[]) => (this.comments = comments))
      .catch(error => console.log(error.message));
  },
  methods: {
    addComment({ name, content }: { name: string; content: string }) {
      const newComment = {
        id: uuid(),
        name: name,
        content: content,
        beerId: this.beer.id
      };
      fetch(process.env.VUE_APP_BEER_API_URL + '/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })
        .then(() => this.comments.push(newComment))
        .catch(error => console.error(error));
    },
    changeState() {
      this.isEditing = !this.isEditing;
    },
    openModal(comment: Comment) {
      this.open = true;
      this.comment = comment;
    },
    closeModal() {
      this.open = !this.open;
    },
    cancelDelete() {
      this.open = !this.open;
    },
    deleteComment(id: string) {
      this.comments = this.comments.filter(comment => comment.id !== id);
      fetch(process.env.VUE_APP_BEER_API_URL + '/comments/' + id, {
        method: 'DELETE'
      }).catch(error => console.error(error));
      this.open = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.comment {
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    margin: 10px 0;

    &_name {
      color: $secondary-color;
      font-size: $headline-2-size;
      font-weight: bold;
      margin: 0.5rem 0 1rem;
    }
    &_post {
      font-size: $body-size;
      font-weight: normal;
      margin: 0.5rem 0;
    }
  }
  &__button {
    background-color: $surface-color;
    border: 1px solid $primary-color;
    border-radius: 0;
    color: $primary-color;
    cursor: pointer;
    font-size: $button-size;
    height: 36px;
    margin: 8px;
    outline: none;
    padding: 9px 12px;

    &--edit {
      &:hover,
      &:focus {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
    &--delete {
      &:hover,
      focus {
        background-color: $error-color;
        border: 1px solid $error-color;
        color: $surface-color;
      }
      &:active {
        background-color: $error-color;
        border: 1px solid $error-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
