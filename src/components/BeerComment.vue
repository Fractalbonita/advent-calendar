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
      <ul v-if="!isEditing" key="comment-view">
        <li v-for="comment in comments" v-bind:key="comment.name">
          <h2>{{ comment.name }}</h2>
          <p>{{ comment.content }}</p>
          <button type="button" v-on:click="changeState">
            Edit comment
          </button>
        </li>
      </ul>
      <div v-else-if="isEditing" key="comment-edit">
        <BeerCommentEditForm v-on:exit-edit="changeState" />
      </div>
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

export default Vue.extend({
  name: 'BeerComment',
  components: {
    BeerCommentAddForm,
    BeerCommentEditForm
  },
  data() {
    return {
      comments: [] as Comment[],
      isEditing: false
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
    }
  }
});
</script>
