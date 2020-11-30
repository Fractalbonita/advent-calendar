<template>
  <div>
    <h2 class="comment__form_headline">Edit your comment</h2>
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
      <p v-if="!newContentIsValid" class="comment__form_error">
        Comment required
      </p>
      <span else class="comment__form_counter"
        >{{ characterCount }} / 400 characters</span
      >
      <p v-if="characterCount === 0" class="comment__form_error">
        The maximum length has been reached. Be concise and keep your comment
        short.
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
      color: $primary-color;
      font-family: 'Lobster';
      font-size: $headline-2-size;
      font-weight: bold;
      margin: 1.5rem 0 1rem;
    }
    &_label {
      color: $text-color;
      display: block;
      font-size: $caption-size;
      font-weight: normal;
      margin: 1.5rem 0 0.5rem;
    }
    &_input,
    &_textarea {
      background-color: $surface-color;
      border: 1px solid $surface-color;
      border-radius: 0;
      color: $text-color;
      cursor: text;
      font-size: $body-size;
      font-weight: normal;
      letter-spacing: 0.1rem;
      margin: 0.5rem 0;
      width: 80%;

      &::placeholder {
        color: $text-color;
        font-size: $caption-size;
        font-weight: normal;
        letter-spacing: 0.1rem;
        opacity: 0.5;
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
      color: $primary-color;
      font-size: $overline-size;
      font-weight: normal;
      margin: 0.2rem 0 1rem;
    }
    &_counter {
      color: $text-color;
      display: block;
      font-size: $caption-size;
      font-weight: normal;
      letter-spacing: 0.1rem;
      margin: 0.5rem 0 1.5rem;
    }
  }
  &__button {
    border-radius: 0;
    cursor: pointer;
    font-size: $button-size;
    font-weight: normal;
    height: 36px;
    letter-spacing: 0.1rem;
    margin: 0 8px;
    outline: none;
    padding: 9px 12px;

    &--cancel {
      background-color: $background-color;
      border: 1px solid $secondary-color;
      color: $secondary-color;

      &:hover,
      &:focus {
        background-color: $background-color;
        border: 1px solid $primary-color;
        color: $primary-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
        opacity: 0.5;
      }
    }
    &--submit {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $text-color;

      &:disabled {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
        opacity: 0.5;
        pointer-events: none;
      }
      &:hover,
      &:focus {
        background-color: $tertiary-color;
        border: 1px solid $secondary-color;
        color: $text-color;
      }
      &:active {
        background-color: $tertiary-color;
        border: 1px solid $secondary-color;
        color: $text-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
