"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleDependencyContainer {
    constructor() {
        this.deps = [];
    }
    registerType(ctor, key) {
        let dep = new Dep(ctor, key);
        this.deps.push(dep);
        return dep;
    }
    getInstance(ctor, key) {
        let id = (key || '') + ':' + ctor.name;
        return this.getInstanceById(id);
    }
    getInstanceById(id) {
        let targetDep;
        for (let dep of this.deps) {
            if (id === dep.id) {
                targetDep = dep;
                break;
            }
        }
        if (!targetDep) {
            throw 'Dependency is not registered: ' + id;
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
            if (arg.id) {
                args.push(this.getInstanceById(arg.id));
            }
            else {
                args.push(arg.value);
            }
        }
        targetDep.instance = new targetDep.ctor(...args);
        return targetDep.instance;
    }
}
exports.SimpleDependencyContainer = SimpleDependencyContainer;
class Dep {
    constructor(ctor, key) {
        this.id = (key || '') + ':' + ctor.name;
        this.ctor = ctor;
        this.args = [];
    }
    argDependency(ctor, key) {
        this.args.push({
            id: (key || '') + ':' + ctor.name
        });
        return this;
    }
    argValue(value) {
        this.args.push({
            value: value
        });
        return this;
    }
}
