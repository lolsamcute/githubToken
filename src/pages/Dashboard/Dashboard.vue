<template>
  <q-page class="bg-primary window-height window-width row justify-center items-center">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div class="column">
       <q-btn
            unelevated color="light-green-7"
            size="lg"
            class="full-width"
            label="Logout"
            no-caps
            type="button"
            @click="logoutUser()"
          />
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Welcome to Home Page</h5>

      </div>
      <div class="row">

        <q-card square bordered class="q-pa-lg shadow-1">
          <form @submit.prevent="handleToken" class="q-gutter-md">

             <q-card-section>
              <q-input
              square filled clearable
              v-model="githubToken"
              type="text"
              label="Github Token"
              ref="githubToken"
              :rules="[
                val => !!val || 'Token is required',
              ]"
              />
          </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                unelevated color="light-green-7"
                size="lg"
                class="full-width"
                label="Save"
                no-caps
                type="submit"
                />
          </q-card-actions>
         </form>
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
      githubToken: '',

    };
  },
  computed: {
    refs() {
      return [
        'githubToken',
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
    async handleToken() {
      try {
        this.validateEachField(this.refs);
        if (this.thereIsAtLeastOneError(this.refs)) {
          return;
        }
        this.$q.loading.show();
        if (this.githubToken.length < 10) {
          Notify.error('Token Less than 10');
          this.$q.loading.hide();
        } else {
           const payload = {
              id: this.id,
              data: {
                githubToken: this.githubToken,
              },
            };
            // update Token
           await this.$api.patch(`encrypted/githubToken/${payload.id}`, payload)
                .then(() => {
                Notify.success('Token updated.');
                this.$router.push({ name: 'dashboard' });
                //
            })
          this.$q.loading.hide();
        }
      } catch (err) {
        this.$q.loading.hide();
        const error = errorHandler(err);
        if (error.status === 422) {
          Notify.error('Token Decrypted');
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

