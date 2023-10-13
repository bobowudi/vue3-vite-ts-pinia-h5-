import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';
import News from '@/views/List/news.vue'
import Detail from '@/views/List/detail.vue'


const routes:RouteRecordRaw[] = [
    {
        component:Home,
        path:'/',
        meta:{
            title:'首页'
        }
    },
    {
        component:News,
        path:'/news',
        meta:{
            title:'列表页'
        }
    },
    {
        component:Detail,
        path:'/detail',
        meta:{
            title:'详情'
        }
    },

]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})

const titleEl = document.getElementsByTagName('title')[0] as HTMLTitleElement;
router.beforeEach((to, from, next) => {
    /**
     * 处理头部
    */
    const { title } = to.meta;
    if (title) {
        titleEl.innerText = title as string;
    } else {
        titleEl.innerText = "信用南山";
    }
    next();
})