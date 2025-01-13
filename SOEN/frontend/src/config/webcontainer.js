import { WebContainer } from '@webcontainer/api';
let webcontainer_instance = null;
export const get_web_container = async () => {
    if (webcontainer_instance === null) {
        webcontainer_instance = await WebContainer.boot();
    }
    return webcontainer_instance;
};