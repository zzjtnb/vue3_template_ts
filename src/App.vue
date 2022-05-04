
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const names = computed(() => userStore.name);
// state 也可以使用解构，但使用解构会使其失去响应式，这时候可以用 pinia 的 storeToRefs。
// import {storeToRefs} from 'pinia';
const { name } = storeToRefs(userStore);
function changeNamme() {
  // 直接修改 state
  userStore.name = '李四';
  // 一般不建议这么做，建议通过 actions 去修改 state，action 里可以直接通过 this 访问
  console.log('三秒钟后会变成王五');
  setTimeout(() => {
    userStore.updateName('王五');
  }, 3000);
}
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <div>
    <el-button type="primary">Info</el-button>
    <div>
      {{ userStore.name }}|{{ name }}||{{ names }}|{{ userStore.fullName }}

      <el-button @click="changeNamme">修改name</el-button>
    </div>
    <div />
  </div>
  <RouterView />
</template>
<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  padding: 2rem;
  margin: 0 auto;
  font-weight: normal;
}

header {
  max-height: 100vh;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  color: hsl(160deg 100% 37% / 100%);
  text-decoration: none;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsl(160deg 100% 37% / 20%);
  }
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    padding: 0 2rem;
    grid-template-columns: 1fr 1fr;
  }

  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
    place-items: center;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
