# Italic

The `italic` mark is used to represent text that is using an italicized type. It will be rendered as `<em>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-italic/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== Vue
<ExamplePlaygroundLazy example="vue-italic" />
== Svelte
<ExamplePlaygroundLazy example="svelte-italic" />
:::

### `toggleItalic`

```ts
editor.commands.toggleItalic()
```

## Keyboard Shortcuts

| Shortcut | Description                            |
| -------- | -------------------------------------- |
| `Mod-I`  | Toggle the current selection to italic |
