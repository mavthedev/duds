// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session } from "lucia-auth";

// and what to do when importing types
declare namespace App {
	interface Locals {
		validate: import("@lucia-auth/sveltekit").Validate;
		validateUser: import("@lucia-auth/sveltekit").ValidateUser;
		setSession: import("@lucia-auth/sveltekit").SetSession;
		Hvalidate: import("@lucia-auth/adapter-mongoose").Validate;
		HvalidateUser: import("@lucia-auth/sveltekit").ValidateUser;
		state: Session | null;
	}
	// interface Platform {}
	interface PrivateEnv {
		PRIVATE_ABLY: string, // private ably key (by default named "Root")
		PRIVATE_MONGO: string, // private mongo URI
	}
	interface PublicEnv {
		PUBLIC_ABLY: string, // public ably key (by default named "Subscribe only")
	}
	// interface Session {}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type UserAttributes = {
		username: string,
		_id: string
	};
}