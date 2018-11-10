"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleDependencyContainer {
    constructor() {
        this.deps = [];
    }
    registerType(ctor, key) {
        let dep = new Dep(ctor);
        this.deps.push(dep);
        return dep;
    }
    getInstance(ctor, key) {
        let targetKey = (key || '') + ':' + ctor.name;
        return this.getInstanceByTargetKey(targetKey);
    }
    getInstanceByTargetKey(targetKey) {
        let targetDep;
        for (let dep of this.deps) {
            if (targetKey === dep.key) {
                targetDep = dep;
                break;
            }
        }
        if (!targetDep) {
            throw 'Dependency is not registered: ' + targetKey;
        }
        if (targetDep.instance) {
            targetDep.instance = targetDep.instance;
            return targetDep.instance;
        }
        if (targetDep.args.length === 0) {
            return new targetDep.ctor();
        }
        let args = [];
        for (let arg of targetDep.args) {
            if (typeof arg === 'string') {
                args.push(this.getInstanceByTargetKey(arg));
            }
            else {
                args.push(arg);
            }
        }
        targetDep.instance = new targetDep.ctor(...args);
        return targetDep.instance;
    }
}
exports.SimpleDependencyContainer = SimpleDependencyContainer;
class Dep {
    constructor(ctor, key) {
        this.key = (key || '') + ':' + ctor.name;
        this.ctor = ctor;
        this.args = [];
    }
    withArg(ctor, key) {
        this.args.push((key || '') + ':' + ctor.name);
        return this;
    }
    withValue(value) {
        this.args.push(value);
        return this;
    }
}

//# sourceMappingURL=simple-dependency-container.js.map
