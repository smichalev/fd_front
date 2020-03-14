import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import {
  Notification,
  Rate,
} from 'element-ui';

Vue.use(Rate);

Vue.prototype.$notify = Notification;
