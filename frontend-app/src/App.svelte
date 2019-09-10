<script>
	import { Router, Link, Route } from "svelte-routing";
	import Users from './Users/Users.svelte'
	import User from './User/User.svelte'
  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Users</Link>
  </nav>
  <div>
    <Route path="users/:userId" component="{User}" />
    <!-- <Route path="blog" component="{Blog}" />
    <Route path="about" component="{About}" /> -->
    <Route path="/" component="{Users}" />
  </div>
</Router>