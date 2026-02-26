<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push("/");
  } catch (error: any) {
    console.error("login error", error);
    errorMessage.value = "Email ou senha inválidos";
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="card w-96 bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center mb-4 text-primary">Entrar</h2>
        <form @submit.prevent="handleLogin" class="form-control">
          <div class="form-control w-full">
            <div class="label">
              <label class="label-text">Email</label>
            </div>
            <input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control w-full">
            <div class="label">
              <label class="label-text">Senha</label>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full mt-4"
            :disabled="authStore.isLoading"
          >
            <span v-if="!authStore.isLoading">Entrar</span>
            <span v-else>Entrando...</span>
          </button>

          <p v-if="errorMessage" class="text-center text-error mt-2 text-sm">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
