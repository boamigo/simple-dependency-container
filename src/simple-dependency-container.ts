export class SimpleDependencyContainer {
	deps: Dep[] = [];

	registerType(ctor: IDependencyConstructor, key?: string): Dep {
		let dep = new Dep(ctor, key);
		this.deps.push(dep);
		return dep;
	}

	getInstance(ctor: IDependencyConstructor, key?: string): any {
		let id = (key || '') + ':' + ctor.name;
		return this.getInstanceById(id);
	}

	private getInstanceById(id: string): any {
		let targetDep: Dep;
		for(let dep of this.deps) {
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

interface IDependencyConstructor {
	new(...args : any[]): any;
}

interface CtorArgument {
	value?: any;
	id?: string;
}

class Dep {
	id: string;
	ctor: IDependencyConstructor;
	args: CtorArgument[];
	instance: any;

	constructor(ctor: IDependencyConstructor, key?: string) {
		this.id = (key || '') + ':' + ctor.name;
		this.ctor = ctor;
		this.args = [];
	}

	argDependency(ctor: Function, key?: string): Dep {
		this.args.push({
			id: (key || '') + ':' + ctor.name
		});
		return this;
	}

	argValue(value: any): Dep {
		this.args.push({
			value: value
		});
		return this;
	}
}
