<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  list-style: none;
}
.el-cascader__dropdown {
    height: 200px;
}

.el-cascader-panel {
    height: 200px;
}
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    /* --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
    border-radius: 6px;
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    /* background: rgb(220, 220, 220); */
    /* --webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.5); */
}

::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(220,220,220,0.4);
}
</style>
