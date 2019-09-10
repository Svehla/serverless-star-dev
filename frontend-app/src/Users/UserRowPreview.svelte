<script>
  import { Link } from 'svelte-routing'

  export let user
</script>

<tr>
  <td>
    <Link to={`users/${user.id}`}>
      <div>{user.name}</div>
    </Link>
  </td>
  <td>
    <div>{new Date(parseInt(user.createdAt)).toISOString()}</div>
  </td>
</tr>
