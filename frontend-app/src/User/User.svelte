<script>
  import axios from "axios";
  import { navigate } from "svelte-routing";
	import { BACKEND_URL } from '../conf.js'

  export let userId
  let user
  let loadingUser = false

  let newName = ""

  const fetchUserById = async () => {
    try {
      loadingUser = true
      const res = await axios.get(`${BACKEND_URL}/users/${userId}`)
      user = res.data.user
      loadingUser = false
    } catch (err) {
      console.error(err)
      loadingUser = false
    }
  }
  fetchUserById()


  const updateUserName = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/users/${userId}`,
        JSON.stringify({ newName })
      )
      console.log(res)
      user = res.data.updatedUser
      newName = ''
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/users/${userId}`)
      navigate("/", { replace: true })
    } catch (err) {
      console.error(err)
    }
  }
</script>

<div>
  {#if loadingUser}
    <div>Loading</div>
  {/if}

  {#if user}
    <h1>{user && user.name}</h1>
    <div>
      id: {user && user.id}
    </div>
    <div>
      createdAt: {user.createdAt && new Date(parseInt(user.createdAt)).toISOString()}
    </div>

    <form on:submit|preventDefault={updateUserName}>
      <div class="input-group mb-3">
        <input bind:value={newName}  type="text" class="form-control" placeholder="user's name">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit">Udpate name</button>
        </div>
      </div>
    </form>

    <br />

    <div>
      <button
        type="button"
        class="btn btn-danger"
        on:click={deleteUser}
      >Delete user</button>
    </div>
  {/if}
</div>