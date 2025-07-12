import { useAuthStore, authClient } from '~/stores/auth-store';

// this plugin is required so that when you refresh the page
// the app does not forget that the user is authenticated already

export default defineNuxtPlugin(async () => {
  // This ensures the plugin only runs on the client-side,
  // which is where localStorage and cookies are accessible.
  if (import.meta.client) {
    const authStore = useAuthStore();

    // Check better-auth's session status or for an existing token
    try {
      const { data: session } = await authClient.getSession();

      if (session?.user) {
        // If a user object is returned, they are considered authenticated
        authStore.setAuth(true, session.user);
        console.log("Auth client initialized: User is authenticated.");
      } else {
        // No user found, so they are not authenticated
        authStore.setAuth(false, null);
        console.log("Auth client initialized: User is NOT authenticated.");
      }
    } catch (err) {
      console.error("Error initializing auth client:", err);
      authStore.setAuth(false, null);
    }
  }
});
