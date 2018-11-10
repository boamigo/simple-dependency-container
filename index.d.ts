export class SimpleDependencyContainer {
	registerType(ctor: IDependencyConstructor, key?: string): Dep;
	getInstance(ctor: IDependencyConstructor, key?: string): any;
}

export interface IDependencyConstructor {
	new(...args : any[]): any;
}

interface Dep {
	withArg(ctor: Function, key?: string): Dep;
	withValue(value: any): Dep;
}
