<script>
	import { Router, Link, Route } from "svelte-routing";
	import Users from './Users/Users.svelte'
	import User from './User/User.svelte'
  export let url = "";
</script>

<div class="container">
  <Router url="{url}">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">Users</Link>
    </nav>
    <div>
      <Route path="/" component="{Users}" />
      <Route path="users/:userId" component="{User}" />
    </div>
  </Router>
</div>