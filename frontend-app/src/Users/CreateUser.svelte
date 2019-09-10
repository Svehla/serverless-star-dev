<script>
  export let onCreateUser
  export let onChangeName
  export let createUserLoading
  export let userName
</script>

<div>
  <div>
    <input type="text" value={userName} on:input={e => onChangeName(e.target.value)} />
    <button
      disabled={createUserLoading}
      on:click={onCreateUser}
    >
      Create user
    </button>
  </div>
</div>

<style>

  button:disabled {
    background: black
  }
</style>