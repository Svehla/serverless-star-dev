<script>
	import UserRowPreview from './UserRowPreview.svelte'
	import CreateUser from './CreateUser.svelte'
	import * as R from 'ramda'
	import axios from 'axios'
	import { BACKEND_URL } from '../conf.js'
	

	let userName = ""
	let users = []
	let createUserLoading = false
	$: sortedUsers = R.sortBy(user => parseInt(user.createdAt), users)
	
	const getUsers = async () => {
		const res = await axios.get(`${BACKEND_URL}/users`)
		users = res.data.users
		
		return res
	}

	let getUserReq = getUsers();

  const createUser = async () => {
    try {
			createUserLoading = true
      const res = await axios.post(
				`${BACKEND_URL}/users`,
				// TODO: setup api gateway for json input
				JSON.stringify({ userName })
			)

			const newUser = res.data.data
			users = [newUser, ...users]
			userName = ''
			createUserLoading = false
    } catch (err) {
			createUserLoading = false
      console.error(err)
    }
  }



</script>

<div>
	{#await getUserReq}
		<p>...loading</p>
	{:then res}
		<div>
			<table class="table">
				{#each sortedUsers as user}
					<UserRowPreview user={user} />
				{/each}
			</table>
			<CreateUser
				createUserLoading={createUserLoading}
				onChangeName={newName => userName = newName}
				userName={userName}
				onCreateUser={createUser}
			/>
		</div>

	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}


</div>