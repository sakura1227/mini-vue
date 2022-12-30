import { effect, trigger, track } from "./effect";

export function computed(getter: Function) {
    let value: any
    let dirty = true;
    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            if (!dirty) {
                dirty = true;
                trigger(obj, 'value')
            }
        }
    });
    const obj = {
        get value() {
            if (dirty) {
                value = effectFn()
                dirty = false
            }
            track(obj, 'value')
            return value
        }
    }
    return obj;
}