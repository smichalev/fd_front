<template>
  <span>

  </span>
</template>

<script>
  export default {
    data: () => ({
      ru: {
        'Отправить': 'Отправить'
      },
      en: {
        'Отправить': 'Send'
      }
    }),
    props: ['phrase'],
    computed: {
      translate() {
        if (this.$store.state.profile) {
          if (this.$store.state.profile.country.toLowerCase() === 'ru') {
            return this['ru'][this.phrase];
          }
          else {
            return this['en'][this.phrase];
          }
        } else {
          return this['en'][this.phrase];
        }
      }
    }
  };
</script>
