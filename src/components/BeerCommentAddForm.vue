<template>
  <div class="comment">
    <div class="comment__button_group">
      <button
        type="button"
        ref="addButton"
        v-if="!isCommenting"
        key="show-form"
        v-on:click="changeState"
        class="comment__button comment__button--add"
      >
        Leave a comment
      </button>
      <button
        tpye="button"
        v-else
        key="hide-form"
        v-on:click="changeState"
        class="comment__button comment__button--cancel"
      >
        Cancel
      </button>
    </div>
    <div v-if="isCommenting" class="comment__form_wrapper">
      <h2 class="comment__form_headline">Leave a comment</h2>
      <form
        autocomplete="off"
        v-on:submit.prevent="onSubmit"
        class="comment__form"
      >
        <label for="name" class="comment__form_label">Name</label>
        <input
          id="name"
          ref="nameInput"
          name="name"
          type="text"
          placeholder="Your name"
          v-model.trim="name"
          class="comment__form_input"
        />
        <p v-if="!nameIsValid" class="comment__form_error">Name required</p>
        <label for="content" class="comment__form_label">Comment</label>
        <textarea
          id="content"
          name="content"
          rows="11"
          cols="40"
          maxlength="400"
          spellcheck="true"
          placeholder="Your comment"
          v-model.trim="content"
          class="comment__form_textarea"
        ></textarea>
        <p v-if="!contentIsValid" class="comment__form_error">
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
          type="submit"
          v-bind:disabled="!formIsValid"
          class="comment__button comment__button--submit"
        >
          Post comment
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Comment from './Comment';

type VueFocus = Vue & { focus: () => boolean };

export default Vue.extend({
  name: 'BeerCommentAddForm',
  data() {
    return {
      isCommenting: false,
      comments: [] as Comment[],
      name: '',
      content: ''
    };
  },
  methods: {
    onSubmit() {
      if (this.formIsValid) {
        this.$emit('new-comment', {
          name: this.name,
          content: this.content
        });
        this.name = '';
        this.content = '';
        this.isCommenting = false;
        this.focusOnAddButton();
      }
    },
    changeState() {
      this.isCommenting = !this.isCommenting;
      this.isCommenting &&
        this.$nextTick(() => (this.$refs.nameInput as VueFocus).focus());
    },
    focusOnAddButton() {
      this.$nextTick(() => (this.$refs.addButton as VueFocus).focus());
    }
  },
  computed: {
    characterCount(): number {
      return 400 - this.content.length;
    },
    nameIsValid(): boolean {
      return !!this.name;
    },
    contentIsValid(): boolean {
      return !!this.content;
    },
    formIsValid(): boolean {
      return this.nameIsValid && this.contentIsValid;
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
      color: $error-color;
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
    outline: none;
    padding: 9px 12px;

    &--add {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $text-color;

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
