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
        ref="newNameInput"
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
      <button
        type="reset"
        v-on:click="$emit('cancel')"
        class="comment__button comment__button--cancel"
      >
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

type VueFocus = Vue & { focus: () => boolean };

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
  mounted() {
    (this.$refs.newNameInput as VueFocus).focus();
  },
  methods: {
    onSubmit() {
      if (this.formIsValid) {
        this.$emit('comment-edited', {
          name: this.newName,
          content: this.newContent
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

<style lang="scss" scoped>
.comment {
  &__form {
    &_headline {
      font-size: $headline-2-size;
      margin: 0.5rem 0;
    }
    &_label {
      color: $primary-color;
      display: block;
      font-size: $caption-size;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    &_input,
    &_textarea {
      border: 1px solid $secondary-color;
      border-radius: 0;
      cursor: text;
      font-size: $body-size;
      margin: 0.5rem 0;
      width: 80%;

      &::placeholder {
        color: $secondary-color;
        font-size: $caption-size;
        opacity: 0.7;
      }
      &:hover {
        border: 1px solid $primary-color;
      }
      &:focus {
        border: 2px solid $primary-color;
        outline: none;
      }
    }
    &_input {
      height: 48px;
      padding: 0 12px;
    }
    &_textarea {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      padding: 12px;
      resize: none;
    }
    &_error {
      color: $error-color;
      font-size: $overline-size;
      margin: 0.2rem 0 1rem 0;
    }
    &_counter {
      color: $secondary-color;
      display: block;
      font-size: $caption-size;
      margin: 0.2rem 0 1rem 0;
    }
  }
  &__button {
    border-radius: 0;
    cursor: pointer;
    font-size: $button-size;
    height: 36px;
    margin: 8px;
    outline: none;
    padding: 9px 12px;

    &--cancel {
      background-color: $surface-color;
      border: 1px solid $secondary-color;
      color: $secondary-color;

      &:hover,
      &:focus {
        background-color: $surface-color;
        border: 1px solid $primary-color;
        color: $primary-color;
      }
      &:active {
        background-color: $primary-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
    &--submit {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $surface-color;

      &:disabled {
        background-color: $disabled-color;
        border: 1px solid $disabled-color;
        color: secondary-color;
        opacity: 0.5;
        pointer-events: none;
      }
      &:hover,
      &:focus {
        background-color: $surface-color;
        border: 1px solid $primary-color;
        color: $primary-color;
      }
      &:active {
        background-color: $primary-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
