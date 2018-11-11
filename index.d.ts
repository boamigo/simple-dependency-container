export class SimpleDependencyContainer {
	registerType(ctor: IDependencyConstructor, key?: string): Dep;
	getInstance(ctor: IDependencyConstructor, key?: string): any;
}

export interface IDependencyConstructor {
	new(...args : any[]): any;
}

interface Dep {
	argDependency(ctor: Function, key?: string): Dep;
	argValue(value: any): Dep;
}
