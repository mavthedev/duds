<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Create an account</h1>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input type="text" id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
		<input type="submit" class="btn btn-filled-primary btn-sm" value="Signup" />
	</form>
</div>