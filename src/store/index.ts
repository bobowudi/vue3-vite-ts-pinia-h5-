import { createPinia } from 'pinia';
export const pinia = createPinia();
pinia.use(({ store }) => {
    if (!/^(LOC)|(SE)_/.test(store.$id)) return;
    store.$subscribe(({ storeId }, state) => {
        if (/^LOC_[A-Z_]*$/.test(storeId)) {
            localStorage.setItem(storeId.toUpperCase().replace('LOC_', ''), JSON.stringify(state));
        } else if (/^SE_[A-Z_]*$/) {
            sessionStorage.setItem(storeId.toUpperCase().replace('SE_', ''), JSON.stringify(state));
        }
    }, { deep: true, detached: true })
})