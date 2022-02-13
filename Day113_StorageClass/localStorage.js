class Storage {
    constructor(storageKey, defaultValue = '', storageType) {
        this.storageKey = storageKey;
        this.storageType = `${storageType}Storage`;

        if (this.storageType === 'sessionStorage') {
            sessionStorage.setItem(storageKey, defaultValue);
        } else {
            localStorage.setItem(storageKey, defaultValue);
        }
    }

    get() {
        return sessionStorage.getItem(this.storageKey) ??
            localStorage.getItem(this.storageKey) ??
            `${this.storageKey} is not found`;
    }

    set(value) {
        if (this.storageType === 'sessionStorage') {
            sessionStorage.setItem(this.storageKey, value);
        } else {
            localStorage.setItem(this.storageKey, value);
        }
    }

    clear() {
        if (this.storageType === 'sessionStorage') {
            sessionStorage.setItem(this.storageKey, '');
        } else {
            localStorage.setItem(this.storageKey, '');
        }
    }

    isEmpty() {
        let key = sessionStorage.getItem(this.storageKey) ?? localStorage.getItem(this.storageKey);

        if (key === '') {
            key = undefined;
        }

        return (key === null || key === undefined);
    }
}

//Tests
const unit = new Storage('unit', '', 'session');
const worker = new Storage('worker', 'Working in aircraft');

console.log(localStorage);
console.log(sessionStorage);

unit.set('unit for airbus 737');
console.log( worker.get() );
console.log( unit.get() );

console.log(localStorage);
console.log(sessionStorage);

worker.clear();

console.log(localStorage);
console.log(sessionStorage);

console.log( unit.isEmpty() );
console.log( worker.isEmpty() );

