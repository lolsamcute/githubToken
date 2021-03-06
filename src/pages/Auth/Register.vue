<template>
  <q-page class="bg-primary window-height window-width row justify-center items-center">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Github Token SignUp</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
           <form @submit.prevent.stop="handleSignup" class="q-gutter-md">
          <q-card-section>

              <q-input
              square filled clearable
              v-model="name"
              type="text"
              label="Full Name"
              ref="name"
              :rules="[
                val => !!val || 'Full Name is required',
              ]"
              />

              <q-input
              square filled clearable
              v-model="email"
              type="email"
              label="Email Address"
              ref="email"
              :rules="[
                val => !!val || 'Email is required',
              ]"
              />

            <q-input
              square filled clearable
              v-model="password"
              label="Password"
              ref="password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                val => !!val || 'Password is required',
              ]"
              >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
           </q-input>

          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
            unelevated color="light-green-7"
            size="lg"
            class="full-width"
            label="Sign Up"
            no-caps
            type="submit"
            />
          </q-card-actions>
          </form>
          <q-card-section class="text-center q-pa-none">
            <router-link class="text-grey-6" :to="{ name: 'login'}">Have an account? Login</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Notify from 'src/helpers/notify.js';
import errorHandler from 'src/helpers/errorHandler.js';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isPwd: true,
    };
  },
  computed: {
    refs() {
      return [
        'name',
        'email',
        'password',
      ];
    },
  },
  methods: {
    validateEachField(refs) {
      refs.forEach((ref) => {
        this.$refs[ref].validate();
      });
    },
    thereIsAtLeastOneError(refs) {
      const thereIsAtLeastOneError = refs.some((ref) => this.$refs[ref].hasError);
      return thereIsAtLeastOneError;
    },
    isValidEmail(email) {
      const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailValidationRegex.test(email.toLowerCase());
    },
    async handleSignup() {
      try {
        this.validateEachField(this.refs);
        if (this.thereIsAtLeastOneError(this.refs)) {
          return;
        }
        this.$q.loading.show();
        if (this.password.length < 6) {
          Notify.error('Password Less than 6');
          this.$q.loading.hide();
        } else {
          const response = await this.$api.post('register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          const { token } = response.data;
          localStorage.setItem('token', JSON.stringify(token));
          this.$router.push({ name: 'login' });
          // const toPath = this.$route.query.to || 'dashboard'
          // this.$router.push(toPath)
          Notify.success('Login Successful, Proceed to Login');
          this.$q.loading.hide();
        }
      } catch (err) {
        this.$q.loading.hide();
        const error = errorHandler(err);
        if (error.status === 422) {
          Notify.error('Email Existing on our Server');
        }
      }
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
