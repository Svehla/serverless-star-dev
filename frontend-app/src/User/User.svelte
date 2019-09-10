<script>
  import axios from "axios";
  import { navigate } from "svelte-routing";
	import { BACKEND_URL } from '../conf.js'

  export let userId

  let newName = ""
  const fetchUserById = async () => {
    console.log('fetch user by id: ', userId)
  }
  fetchUserById()


  const updateUserName = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/users/${userId}`,
        JSON.stringify({ newName })
      )
      navigate("/", { replace: true })
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
  <h1>{userId}</h1>
  <div>
    <input bind:value={newName} />
    <button on:click={updateUserName}>udpate user name</button>
  </div>

  <div>
    <button on:click={deleteUser}>Delete user</button>
  </div>
</div>