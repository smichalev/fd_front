import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import {
  Notification,
  Rate,
  Timeline,
  TimelineItem,
  Tooltip
} from 'element-ui';

Vue.use(Rate);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Tooltip);

Vue.prototype.$notify = Notification;
