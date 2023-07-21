import { defineStore } from 'pinia';
import { ref, type Ref} from 'vue';

export const useServiceWorkerStore = defineStore('serviceWorker', () => {
    const isShowMessage: Ref<boolean> = ref(false);

    const toggleIsShowMessage = (isShow: boolean) => {
        isShowMessage.value = isShow;
    };

    const serviceWorkerMessage: Ref<string> = ref('');

    const setServiceWorkerMessage = (message: string) => {
        serviceWorkerMessage.value = message;
        isShowMessage.value = true;
    };

    return {
        isShowMessage,
        toggleIsShowMessage,
        serviceWorkerMessage,
        setServiceWorkerMessage,
    }
});
