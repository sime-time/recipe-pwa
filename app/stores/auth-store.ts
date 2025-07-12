import { createAuthClient } from "better-auth/vue";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //baseURL: "http://localhost:8787",
  baseURL: "https://recipe-api.simedunn01.workers.dev",
  plugins: [emailOTPClient()],
});

export const useAuthStore = defineStore("useAuthStore", () => {
  const toast = useToast();
  const router = useRouter();

  const authenticated = ref(false);
  const user = ref(null);
  const loading = ref(false);

  function setAuth(isAuthenticated: boolean, userData: any) {
    authenticated.value = isAuthenticated;
    user.value = userData;
  }

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
        setAuth(true, signInAttempt.data.user);
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


  async function signUp(name: string, email: string, password: string) {
    if (!email || !password) {
      return toast.error({
        title: "Sign-up failed",
        message: "Please fill in all fields",
        position: "topCenter",
      });
    }

    if (password.length < 8) {
      return toast.error({
        title: "Sign-up failed",
        message: "Password must be at least 8 characters",
        position: "topCenter",
      });
    }

    loading.value = true;

    try {
      // create new user
      const signUpAttempt = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signUpAttempt.error) {
        console.error("Sign-up failed:", signUpAttempt.error);
        return toast.error({
          title: "Sign-up failed",
          message: signUpAttempt.error.message,
          position: "topCenter",
        });
      };

      setAuth(true, signUpAttempt.data.user);
      router.push(`/verify-email?address=${signUpAttempt.data.user.email}`);

    } catch (error) {
      console.error("Error", error);

    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    console.log("signing out...");

    const signOutAttempt = await authClient.signOut();
    if (signOutAttempt.error) {
      console.error("Sign-out failed:", signOutAttempt.error);
      return toast.error({
        title: "Sign-out failed",
        message: signOutAttempt.error.message,
        position: "topCenter",
      });
    }
    setAuth(false, null);

    await router.push("/sign-in");
    loading.value = false;
  }


  async function sendCodeToEmail(email: string, resend?: boolean) {
    // send verification code to user email
    const sendEmailAttempt = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification"
    });

    if (sendEmailAttempt.error) {
      console.error(sendEmailAttempt.error);
      return toast.error({
        title: "Error",
        message: "Failed to send verification email.",
        position: "topCenter",
      });
    }

    if (resend) {
      return toast.show({
        title: "Verification",
        message: `Sent code to ${email}`,
        position: "topCenter",
      });
    }
  }

  async function verifyEmailCode(email: string, code: string) {
    loading.value = true;
    try {
      // use the code input to attempt verification
      const verifyEmailAttempt = await authClient.emailOtp.verifyEmail({
        email: email,
        otp: code,
      });

      if (verifyEmailAttempt.error) {
        return toast.error({
          title: "Error",
          message: "Verification failed. Please try again.",
          position: "topCenter",
        });
      }

      console.log("email verified!");

      setAuth(true, verifyEmailAttempt.data.user);
      router.push("/")

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
    signUp,
    signOut,
    sendCodeToEmail,
    verifyEmailCode,
    setAuth,
  };
});
