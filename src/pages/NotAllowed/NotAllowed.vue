<template>
  <div class="notAllowed q-pa-md">
    <div class="notAllowed__header">
      <q-img
        src="~assets/logo/consumeus-logo.png"
        style="width: 5rem"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
    <div class="notAllowed__content row justify-center content-end text-center">
      <div class="column text-center">
        <q-img
          src="~assets/oops.png"
          spinner-color="white"
          style="max-width: 25rem; margin: 0 auto;"
        />
        <h1 style="font-size: 50px; color: #44099F; font-weight: 500; margin: 0 auto;">ERROR!</h1>
        <p style="margin-top: -40px; font-size: 25px; color: #534B63; width: 70%; margin: 0 auto;">Sorry, Nothing here on this page</p>
      </div>
    </div>
  </div>
</template>

<script>
import './_notAllowed.scss';

export default {
  name: 'not-allowed',
};
</script>
