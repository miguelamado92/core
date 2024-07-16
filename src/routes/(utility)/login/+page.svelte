<script lang="ts">
	import { PUBLIC_HOST } from '$env/static/public';
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="271895357601-h1p67c2ji180lm3qgjkvd3f4s1mcp2hd.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-login_uri={`${PUBLIC_HOST}/auth/google`}
	data-auto_prompt="false"
></div>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="outline"
	data-text="signin_with"
	data-size="medium"
	data-logo_alignment="left"
></div>
