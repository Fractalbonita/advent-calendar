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
      <ul key="comment-view">
        <li v-for="comment in comments" v-bind:key="comment.name">
          <div v-if="!isEditing">
            <h2>{{ comment.name }}</h2>
            <p>{{ comment.content }}</p>
            <button type="button" v-on:click="changeState">
              Edit
            </button>
            <button type="button" v-on:click="openModal(comment)">
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
