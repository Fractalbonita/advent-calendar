<template>
  <div>
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
import Vue from 'vue';
import BeerCommentEditForm from './BeerCommentEditForm.vue';

export default Vue.extend({
  name: 'BeerComment',
  components: {
    BeerCommentEditForm
  },
  data() {
    return {
      isEditing: false
    };
  },
  props: {
    comments: Array
  },
  methods: {
    changeState() {
      this.isEditing = !this.isEditing;
    }
  }
});
</script>
