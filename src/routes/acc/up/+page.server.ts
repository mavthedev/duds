import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';
import { generateRandomString } from 'lucia-auth';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		// check for empty values
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		try {
			const user = await auth.createUser('username', username, {
				password,
				attributes: {
					username,
                    _id: generateRandomString(10)
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch(e) {
            console.log(e)
			// username already in use
			return fail(400);
		}
	}
};