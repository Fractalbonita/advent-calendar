<template>
  <div class="comment">
    <div class="comment__button_group">
      <button
        type="button"
        v-if="!isCommenting"
        key="show-form"
        v-on:click="changeState"
        class="comment__button--add"
      >
        Leave a comment
      </button>
      <button
        tpye="button"
        v-else
        key="hide-form"
        v-on:click="changeState"
        class="comment__button--cancel"
      >
        Cancel
      </button>
    </div>
    <div v-if="isCommenting" class="comment__form_wrapper">
      <h2>Leave a comment</h2>
      <form v-on:submit.prevent="addComment(beer.id)" class="comment__form">
        <input type="hidden" v-bind:value="'ciao'" />
        <label for="name" class="comment__form_label">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          v-model="name"
          class="comment__form_input"
        />
        <label for="content" class="comment__form_label">Comment</label>
        <textarea
          id="content"
          name="content"
          rows="11"
          cols="40"
          maxlength="400"
          spellcheck="true"
          placeholder="Your comment"
          v-model="content"
          class="comment__form_textarea"
        ></textarea>
        <span class="comment__form_count">{{ characterCount }} / 400</span>
        <span v-if="characterCount === 0" class="comment__form_error"
          >The maximum length has been reached. Be concise and keep your comment
          short.</span
        >
        <button
          type="submit"
          v-bind:disabled="isDisabled"
          class="comment__form_button--submit"
        >
          Post comment
        </button>
      </form>
    </div>
    <BeerComment v-bind:comments="comments" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { v4 as uuid } from 'uuid';
import Beer from './Beer';
import Comment from './Comment';
import BeerComment from './BeerComment.vue';

export default Vue.extend({
  name: 'BeerCommentAddForm',
  components: {
    BeerComment
  },
  data() {
    return {
      isCommenting: false,
      comments: [] as Comment[],
      id: uuid(),
      name: '',
      content: ''
    };
  },
  props: {
    beer: { type: Object as PropType<Beer> }
  },
  methods: {
    addComment(id: string) {
      const newComment = {
        id: this.id,
        name: this.name,
        content: this.content,
        beerId: id
      };
      this.comments.push(newComment);
      fetch(process.env.VUE_APP_BEER_API_URL + '/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      }).catch(error => console.error(error));
      console.log(this.comments);
      this.name = '';
      this.content = '';
      this.isCommenting = false;
    },
    changeState() {
      this.isCommenting = !this.isCommenting;
    }
  },
  computed: {
    characterCount(): number {
      return 400 - this.content.length;
    },
    isDisabled(): boolean {
      if (this.name.length === 0 || this.content.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
#comment {
  resize: none;
}
</style>
