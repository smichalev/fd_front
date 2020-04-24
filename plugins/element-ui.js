import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import {
  Notification,
  Rate,
  Timeline,
  TimelineItem
} from 'element-ui';

Vue.use(Rate);
Vue.use(Timeline);
Vue.use(TimelineItem);

Vue.prototype.$notify = Notification;
