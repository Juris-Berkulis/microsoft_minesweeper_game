<script setup lang="ts">
import BaseCopy from '@/components/BaseCopy.vue';
import TheFieldSize from '@/components/TheFieldSize.vue';
import TheLanguageSelection from '@/components/TheLanguageSelection.vue';
import TheSettingsSwitchers from '@/components/TheSettingsSwitchers.vue';
</script>

<template>
    <div class="setting">
        <RouterLink class="link" id="homeView" to="/">Вернуться в поле</RouterLink>
        <BaseCopy />
        <TheLanguageSelection />
        <TheFieldSize />
        <TheSettingsSwitchers />
    </div>
</template>

<style scoped>
.setting {
    height: 100%;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 15px;
    font-size: 1rem;
    overflow-y: auto;
}

@media (max-width: 350px) {
    .setting {
        font-size: 0.8rem;
    }
}

@media (max-width: 200px) {
    .setting {
        font-size: 0.5rem;
    }
}

.link {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    padding: 8px 15px;
    text-align: center;
    background-color: #449944;
    font-size: 1em;
    font-weight: 700;
    line-height: 1;
    color: #ffffff;
}

.link:hover {
    background-color: #227722;
}
</style>
