<template>
  <section class="card">
    <header>
      <h2>Test Inputs</h2>
      <p class="hint">Try text, number, boolean, photo, and more.</p>
    </header>

    <form class="grid" @submit.prevent>
      <label>
        <span>Text</span>
        <input v-model.trim="form.text" type="text" placeholder="Enter text" />
      </label>

      <label>
        <span>Number</span>
        <input v-model.number="form.number" type="number" min="0" step="1" placeholder="0" />
      </label>

      <label class="row">
        <input v-model="form.boolean" type="checkbox" />
        <span>Boolean</span>
      </label>

      <label>
        <span>Select</span>
        <select v-model="form.select">
          <option value="">-- choose --</option>
          <option>Alpha</option>
          <option>Beta</option>
          <option>Gamma</option>
        </select>
      </label>

      <label>
        <span>Date</span>
        <input v-model="form.date" type="date" />
      </label>

      <label>
        <span>Photo</span>
        <input type="file" accept="image/*" @change="onFile" />
      </label>

      <div v-if="photoUrl" class="preview">
        <img :src="photoUrl" alt="Preview" />
      </div>
    </form>

    <div class="actions">
      <button type="button" :disabled="saving" @click="handleSubmit">
        {{ saving ? 'Sending…' : 'Send to Firestore' }}
      </button>
      <small class="hint" v-if="!hasFirebaseConfig()">Configure VITE_FIREBASE_* to enable Firestore.</small>
      <p v-if="status === 'ok'" class="ok">Saved successfully.</p>
      <p v-if="status === 'error'" class="err">Failed: {{ errorMsg }}</p>
    </div>

    <details class="output">
      <summary>Live JSON</summary>
      <pre>{{ pretty }}</pre>
    </details>
  </section>
</template>

<script setup>
import { reactive, computed, onBeforeUnmount, ref } from 'vue'
import { submitFormToFirestore, hasFirebaseConfig } from '../lib/firebase'

const form = reactive({
  text: '',
  number: 0,
  boolean: false,
  select: '',
  date: '',
  photo: null,
})

let photoUrl = null

const pretty = computed(() => JSON.stringify({
  ...form,
  photo: form.photo ? { name: form.photo.name, size: form.photo.size } : null,
}, null, 2))

function onFile(e) {
  const file = e.target.files?.[0]
  form.photo = file || null
  if (photoUrl) URL.revokeObjectURL(photoUrl)
  photoUrl = file ? URL.createObjectURL(file) : null
}

onBeforeUnmount(() => { if (photoUrl) URL.revokeObjectURL(photoUrl) })

const saving = ref(false)
const status = ref(null) // 'ok' | 'error' | null
const errorMsg = ref('')

async function handleSubmit() {
  saving.value = true
  status.value = null
  errorMsg.value = ''
  const payload = {
    text: form.text,
    number: form.number,
    boolean: form.boolean,
    select: form.select,
    date: form.date,
    // Do not store raw file; include metadata only.
    photo: form.photo ? { name: form.photo.name, size: form.photo.size, type: form.photo.type } : null,
  }
  try {
    if (hasFirebaseConfig()) {
      await submitFormToFirestore(payload)
    } else {
      // Fallback for local testing when Firebase isn't configured.
      console.info('[Mock submit]', payload)
      await new Promise(r => setTimeout(r, 400))
    }
    status.value = 'ok'
  } catch (err) {
    console.error(err)
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.card { background: var(--card); border: 1px solid #22262b; border-radius: 10px; padding: 16px; }
header { margin-bottom: 8px; }
h2 { margin: 0 0 4px; font-size: 20px; }
.hint { margin: 0; color: var(--muted); font-size: 12px; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
label { display: grid; gap: 6px; font-size: 14px; }
label.row { grid-auto-flow: column; align-items: center; justify-content: start; gap: 8px; }
input, select { background: #0f1216; color: var(--fg); border: 1px solid #2a2f36; border-radius: 8px; padding: 8px 10px; outline: none; }
input:focus, select:focus { border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 30%, transparent); }
.preview { grid-column: 1 / -1; display: grid; place-items: start; }
.preview img { max-width: 260px; border-radius: 8px; border: 1px solid #2a2f36; }
.actions { margin-top: 12px; display: flex; align-items: center; gap: 10px; }
button { background: var(--brand); color: #0b0c0e; border: none; border-radius: 8px; padding: 8px 12px; font-weight: 600; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: default; }
.ok { color: #59d38c; margin: 0; }
.err { color: #ff6b6b; margin: 0; }
.output { margin-top: 14px; }
pre { margin: 8px 0 0; background: #0f1216; border: 1px solid #2a2f36; border-radius: 8px; padding: 12px; overflow: auto; max-height: 280px; }
</style>
