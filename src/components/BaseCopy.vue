<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const {
    getTranslation,
} = useLanguageSelectionStore();

const copySuccess: Ref<boolean> = ref(false);
const copyError: Ref<boolean> = ref(false);

const navigatorClipboard = navigator.clipboard;

const copyLink = (): void => {
    copySuccess.value = false;
    copyError.value = false;

    if (navigatorClipboard) {
        navigator.clipboard.writeText(location.origin)
            .then(() => {
                copySuccess.value = true;
            })
            .catch(err => {
                copyError.value = true;
            });
    }
}
</script>

<template>
<div class="copyWrapper" v-if="navigatorClipboard">
    <button class="copyBtn" id="copyBtn" @click="copyLink">{{ getTranslation('boseCopy_shareAppLink') }}</button>
    <div class="copyTextContainer">
        <p class="copyText copySuccess" v-if="copySuccess">{{ getTranslation('boseCopy_linkCopiedToClipboard') }}</p>
        <p class="copyText copyError" v-else-if="copyError">{{ getTranslation('boseCopy_linkCopyError') }}</p>
    </div>
</div>
</template>

<style scoped>
.copyWrapper {
    width: 100%;
    margin-bottom: calc(15px + 1em);
}

.copyBtn {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 3px solid currentColor;
    background-color: transparent;
    font-size: 1em;
    font-weight: 700;
    line-height: 1.15;
    color: #6497d4;
    transition: all 0.4s ease-in-out 0s;
}

.copyBtn:hover {
    color: #3d72b3;
}

.copyTextContainer {
    position: relative;
    height: 0;
    width: 100%;
    margin-top: 5px;
}

.copyText {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 0.8em;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
}

.copySuccess {
    color: #008000;
}

.copyError {
    color: #ff0000;
}
</style>
