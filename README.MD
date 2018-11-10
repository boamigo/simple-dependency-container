# simple-dependency-container
Provides dependency injection for NodeJS apps

No need to use Annotations and Strings to identify dependencies, the actual Class reference is enough.

main.ts
``` js
export class Dependency1 {
}

export class Dependency2 {
}

export class Parent1 {
  constructor(
    private dep1: Dependency1,
    private dep2: Dependency2,
    private textValue: string) {
  }
}
```

container.ts
``` js
import { SimpleDependencyContainer } from 'simple-dependency-container';
import { Dependency1, Dependency2, Parent1 } from './main';

let container = new SimpleDependencyContainer();
container.registerType(Dependency1);  // registered as singleton
container.registerType(Dependency2);  // registered as singleton

container.registerType(Parent1)  // registered as singleton
	.withArg(Dependency1)
	.withArg(Dependency2)  
	.withValue('Injected Value');

export default container;
```

server.ts
``` js
import container from './container';
import { Dependency1, Dependency2, Parent1 } from './main';

// parent1 will have injected dependencies
let parent1 = container.getInstance(Parent1);

// also you can ask for dependency directly
let dependency1 = container.getInstance(Dependency1);
```

Note, all instances are singletons.