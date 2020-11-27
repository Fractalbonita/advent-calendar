<template>
  <div>
    <h2>Edit your comment</h2>
    <form
      autocomplete="off"
      v-on:submit.prevent="onSubmit"
      class="comment__form"
    >
      <label for="name" class="comment__form_label">Name</label>
      <input
        id="newName"
        name="newName"
        type="text"
        v-model.trim="newName"
        class="comment__form_input"
      />
      <p v-if="!newNameIsValid" class="comment__form_error">Name required</p>
      <label for="content" class="comment__form_label">Comment</label>
      <textarea
        id="newContent"
        name="newContent"
        rows="11"
        cols="40"
        maxlength="400"
        spellcheck="true"
        v-model.trim="newContent"
        class="comment__form_textarea"
      ></textarea>
      <span else class="comment__form_counter"
        >{{ characterCount }} / 400 characters</span
      >
      <p v-if="characterCount === 0" class="comment__form_error">
        The maximum length has been reached. Be concise and keep your comment
        short.
      </p>
      <p v-if="!newContentIsValid" class="comment__form_error">
        Comment required
      </p>
      <button type="reset" v-on:click="$emit('cancel')">
        Cancel
      </button>
      <button
        type="submit"
        v-bind:disabled="!formIsValid"
        class="comment__button comment__button--submit"
      >
        Save comment
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Comment from './Comment';

export default Vue.extend({
  name: 'BeerCommentEditForm',
  data() {
    return {
      comments: [] as Comment[],
      comment: {} as Comment,
      newName: this.name,
      newContent: this.content
    };
  },
  props: {
    name: String,
    content: String
  },
  methods: {
    onSubmit() {
      if (this.formIsValid) {
        this.$emit('comment-edited', {
          newName: this.newName,
          newContent: this.newContent
        });
        this.newName = '';
        this.newContent = '';
      }
    }
  },
  computed: {
    characterCount(): number {
      return 400 - this.newContent.length;
    },
    newNameIsValid(): boolean {
      return !!this.newName;
    },
    newContentIsValid(): boolean {
      return !!this.newContent;
    },
    formIsValid(): boolean {
      return this.newNameIsValid && this.newContentIsValid;
    }
  }
});
</script>
