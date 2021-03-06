<template>
  <div>
    <BeerCommentAddForm v-on:new-comment="addComment" v-bind:beer="beer" />
    <div v-if="comments.length === 0">
      <p class="comment__fallback">
        There are no comments yet. You can leave a comment by tapping the button
        above.
      </p>
    </div>
    <div v-else>
      <ul class="comment__list">
        <li
          v-for="comment in reversedComments"
          v-bind:key="comment.id"
          class="comment__item"
        >
          <div v-if="isEditing === comment.id" key="comment-edit">
            <BeerCommentEditForm
              v-bind:name="comment.name"
              v-bind:content="comment.content"
              v-bind:beer="beer"
              v-on:cancel="closeEdit"
              v-on:comment-edited="editComment(comment.id, $event)"
            />
          </div>
          <div v-else key="comment-view">
            <h2 class="comment__item_name">{{ comment.name }}</h2>
            <p class="comment__item_post">{{ comment.content }}</p>
            <button
              type="button"
              ref="editButton"
              v-on:click="changeState(comment.id)"
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

type VueFocus = Vue & { focus: () => boolean };

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
      isEditing: '',
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
    changeState(id: string) {
      this.isEditing = id;
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
    },
    closeEdit() {
      this.isEditing = '';
    },
    editComment(id: string, changes: object) {
      const commentToEdit = this.comments.find(c => c.id === id) as Comment;
      const editedComment = { ...commentToEdit, ...changes };
      fetch(process.env.VUE_APP_BEER_API_URL + '/comments/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedComment)
      })
        .then(
          () =>
            (this.comments = this.comments.map(comment =>
              comment.id === id ? editedComment : comment
            ))
        )
        .catch(error => console.error(error));
      this.closeEdit();
      this.focusOnEditButton();
    },
    focusOnEditButton() {
      this.$nextTick(() => (this.$refs.editButton as VueFocus).focus());
    }
  },
  computed: {
    reversedComments(): Comment[] {
      return this.comments.slice(0).reverse();
    }
  }
});
</script>

<style lang="scss" scoped>
.comment {
  &__fallback {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1.5rem 0;
  }
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    margin: 10px 0;

    &_name {
      color: $text-color;
      font-size: $headline-3-size;
      font-weight: bold;
      margin: 1.5rem 0 1rem;
    }
    &_post {
      font-size: $body-size;
      font-weight: normal;
      margin: 0.5rem 0 1rem;
    }
  }
  &__button {
    background-color: $background-color;
    border: 1px solid $primary-color;
    border-radius: 0;
    color: $primary-color;
    cursor: pointer;
    font-size: $button-size;
    font-weight: normal;
    height: 36px;
    letter-spacing: 0.1rem;
    margin: 0 8px;
    outline: none;
    padding: 9px 12px;

    &--edit,
    &--delete {
      &:hover,
      &:focus {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
