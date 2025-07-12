<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const router = useRouter();
const toast = useToast();
const route = useRoute();
const email = route.query.address as string;

const code = ref("");
const loading = ref(false);

onMounted(async () => {
  // send verification code to user email
  const sendEmailAttempt = await authClient.emailOtp.sendVerificationOtp({
    email: email,
    type: "email-verification"
  });

  console.log("sending verification code to", email);

  if (sendEmailAttempt.error) {
    console.error(JSON.stringify(sendEmailAttempt, null, 2));
    return toast.error({
      title: "Error",
      message: "Failed to send verification email.",
      position: "topCenter",
    });
  }
});

async function handleResendEmail() {
  // this is a duplicate of the email sending logic,
  // but it's okay because it's explicitly for the resend button.
  const resendEmailAttempt = await authClient.emailOtp.sendVerificationOtp({
    email: email,
    type: "email-verification",
  });

  console.log("resending verification code to", email);
  if (resendEmailAttempt.error) {
    console.error(JSON.stringify(resendEmailAttempt, null, 2));
    return toast.error({
      title: "Error",
      message: "Failed to resend verification email. Please try again.",
      position: "topCenter",
    });
  } else {
    return toast.show({
      title: "Verification",
      message: `Sent code to ${email}`,
      position: "topCenter",
    });
  }
}

async function handleVerification() {
  loading.value = true;
  try {
    // use the code input to attempt verification
    const verifyEmailAttempt = await authClient.emailOtp.verifyEmail({
      email: email,
      otp: code.value,
    });

    if (verifyEmailAttempt.error) {
      return toast.error({
        title: "Error",
        message: "Verification failed. Please try again.",
        position: "topCenter",
      });
    }

    console.log("email verified!");
    router.push("/")

  } catch (error) {
    console.error("Error", error);

  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <!-- IMAGE CONTAINER -->
    <div class="image-container">
      <img src="~/assets/images/i3.webp" class="image" alt="verify email chef" />
    </div>

    <h1 class="title">Verify Your Email</h1>
    <p class="subtitle link-text">We've sent a verification code to {{ email }}</p>

    <!-- FORM CONTAINER -->
    <form class="form-container" @submit.prevent="handleVerification">

      <!-- VERIFICATION CODE INPUT -->
      <div class="input-container">
        <input type="text" class="text-input" placeholder="Enter verification code" v-model="code"
          inputmode="numeric" />
      </div>

      <!-- VERIFY BUTTON -->
      <button type="submit" class="auth-button button-text" :disabled="loading">
        <span v-if="loading">Verifying...</span>
        <span v-else>Verify Email</span>
      </button>

      <!-- RESEND EMAIL -->
      <div class="link-container link-text touch-opacity" @click="handleResendEmail">
        <p>Didn't get an email? <span class="link">Resend code to email</span></p>
      </div>
    </form>
  </div>
</template>
