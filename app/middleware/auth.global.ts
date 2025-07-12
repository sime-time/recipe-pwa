import { useAuthStore } from "~/stores/auth-store";
import { storeToRefs } from "pinia";

// the middleware is a guard that protects routes
// it checks the auth store to determine if user is authenticated

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(authStore)

  // Routes that do NOT require authentication
  const publicRoutes = ['/sign-in', '/sign-up', '/verify-email']; // Adjust as needed

  // Determine if the current route explicitly requires authentication
  // You might add `definePageMeta: { requiresAuth: true }` to your page components
  const requiresAuth = !publicRoutes.includes(to.path) || to.meta.requiresAuth;

  // If the route requires authentication (e.g., via meta field)
  // AND the user is NOT authenticated
  if (!authenticated.value && requiresAuth) {
    // You can also check for a token in localStorage here for initial load
    // if the store hasn't been rehydrated yet, but it's better to
    // handle that during app initialization or a dedicated token refresh flow.

    return navigateTo('/sign-in'); // Redirect to your login page
  }

  // If the route is a login page AND the user IS authenticated,
  // redirect them away from the login page.
  if ((to.path === '/sign-in' || to.path === '/sign-up' || to.path === '/verify-email') && authenticated.value) {
    return navigateTo('/'); // Redirect to home or dashboard
  }

  // You can add more complex logic here, like role-based checks:
  // if (to.meta.requiresAdmin && (!authStore.isAuthenticated || !authStore.user?.isAdmin)) {
  //   return navigateTo('/'); // Or a specific forbidden page
  // }
});
