import { createAuthClient } from "better-auth/vue";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8787", // URL of backend api
  plugins: [emailOTPClient()],
});

export const useAuthStore = defineStore("useAuthStore", () => {
  const toast = useToast();
  const router = useRouter();
  const loading = ref(false);

  const session = authClient.useSession();

  // Expose status to distinguish between loading and unauthenticated states
  const authenticated = computed(() => !!session.value.data);
  const user = computed(() => session.value?.data?.user ?? null);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return toast.error({
        title: "Sign-in failed",
        message: "Please fill in all fields",
        position: "topCenter",
      });
    }

    loading.value = true;

    try {
      const signInAttempt = await authClient.signIn.email({
        email,
        password,
      });

      if (signInAttempt.error) {
        console.error("Sign-in failed:", signInAttempt.error);
        return toast.error({
          title: "Sign-in failed",
          message: signInAttempt.error.message,
          position: "topCenter",
        });
      }

      // if email is still not verified, send verification email again
      if (signInAttempt.data.user.emailVerified) {
        router.push("/")
      } else {
        router.push(`/verify-email?address=${signInAttempt.data.user.email}`)
      }

    } catch (error) {
      console.error("Error", error);

    } finally {
      loading.value = false;
    }
  }

  return {
    authenticated,
    user,
    loading,
    signIn,
  };
});
