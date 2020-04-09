<template>
  <span>
    {{ formatDate }}
  </span>
</template>

<script>
  export default {
    props: ['date'],
    computed: {
      formatDate() {
        let date = new Date(this.date);
        let day = date.getDate();
        if (+day < 10) {
          day = '0' + day;
        }
        let mounth = date.getMonth() + 1;
        if (+mounth < 10) {
          mounth = '0' + mounth;
        }
        let year = date.getFullYear();
        let hour = date.getHours();
        if (+hour < 10) {
          hour = '0' + hour;
        }
        let minutes = date.getMinutes();
        if (+minutes < 10) {
          minutes = '0' + minutes;
        }
        let seconds = date.getSeconds();
        if (+seconds < 10) {
          seconds = '0' + seconds;
        }
        return day + '.' + mounth + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds;
      }
    }
  };
</script>
