"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleDependencyContainer = /** @class */ (function () {
    function SimpleDependencyContainer() {
        this.deps = [];
    }
    SimpleDependencyContainer.prototype.registerType = function (ctor, key) {
        var dep = new Dep(ctor);
        this.deps.push(dep);
        return dep;
    };
    SimpleDependencyContainer.prototype.getInstance = function (ctor, key) {
        var targetKey = (key || '') + ':' + ctor.name;
        return this.getInstanceByTargetKey(targetKey);
    };
    SimpleDependencyContainer.prototype.getInstanceByTargetKey = function (targetKey) {
        var _a;
        var targetDep;
        for (var _i = 0, _b = this.deps; _i < _b.length; _i++) {
            var dep = _b[_i];
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
        var args = [];
        for (var _c = 0, _d = targetDep.args; _c < _d.length; _c++) {
            var arg = _d[_c];
            if (typeof arg === 'string') {
                args.push(this.getInstanceByTargetKey(arg));
            }
            else {
                args.push(arg);
            }
        }
        targetDep.instance = new ((_a = targetDep.ctor).bind.apply(_a, [void 0].concat(args)))();
        return targetDep.instance;
    };
    return SimpleDependencyContainer;
}());
exports.SimpleDependencyContainer = SimpleDependencyContainer;
var Dep = /** @class */ (function () {
    function Dep(ctor, key) {
        this.key = (key || '') + ':' + ctor.name;
        this.ctor = ctor;
        this.args = [];
    }
    Dep.prototype.withArg = function (ctor, key) {
        this.args.push((key || '') + ':' + ctor.name);
        return this;
    };
    Dep.prototype.withValue = function (value) {
        this.args.push(value);
        return this;
    };
    return Dep;
}());

//# sourceMappingURL=simple-dependency-container.js.map
