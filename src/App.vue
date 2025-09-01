<template>
  <main class="container">
    <h1>Field Playground</h1>
    <FieldPlayground />
  </main>
</template>

<script setup>
import FieldPlayground from './components/FieldPlayground.vue'
</script>

<style>
:root {
  color-scheme: light dark;
  --bg: #0b0c0e;
  --fg: #e6e8eb;
  --card: #17191c;
  --muted: #9aa3ad;
  --brand: #42b883;
}

* { box-sizing: border-box; }
html, body, #app { height: 100%; margin: 0; }
body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: var(--bg); color: var(--fg); }
.container { max-width: 900px; margin: 32px auto; padding: 0 16px; }
h1 { font-size: 28px; margin: 8px 0 20px; }
</style>

