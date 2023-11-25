class EventEmitter {
    listeners = {}
    addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
    }
    on(eventName, fn) {
    return this.addListener(eventName, fn);
    }
    once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
    fn();
    this.off(eventName, onceWrapper);
    }
    this.listeners[eventName].push(onceWrapper);
    return this;
    }
    off(eventName, fn) {
    return this.removeListener(eventName, fn);
    }
    removeListener (eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    for(let i = lis.length; i > 0; i--) {
    if (lis[i] === fn) {
    lis.splice(i,1);
    break;
    }
    }
    return this;
    }
    emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
    f(...args);
    });
    return true;
    }
    listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
    }
    rawListeners(eventName) {
    return this.listeners[eventName];
    }
    }
    const myEmitter = new EventEmitter();
    function c1() {
    console.log('an event occurred!');
    }
    function c2() {
    console.log('yet another event occurred!');
    }
    myEmitter.on('eventOne', c1); // Register for eventOne
    myEmitter.on('eventOne', c2); // Register for eventOne
    myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
    myEmitter.once('init', () => console.log('init once fired'));
    myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
    myEmitter.emit('eventOne');
    myEmitter.emit('eventOnce');
    myEmitter.emit('eventOne');
    myEmitter.emit('init');
    myEmitter.emit('init');
    myEmitter.emit('eventOne');
    myEmitter.emit('status', 200, 'ok');
    console.log(myEmitter.listenerCount('event1'));
    console.log(myEmitter.rawListeners('event1'));
    class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
    this.emit('begin');
    console.time('execute');
    this.on('data', (data)=> console.log('got data ', data));
    asyncFunc(...args, (err, data) => {
    if (err) {
    return this.emit('error', err);
    }
    this.emit('data', data);
    console.timeEnd('execute');
    this.emit('end');
    });
    }
    }
    const withTime = new WithTime();
    withTime.on('begin', () => console.log('About to execute'));
    withTime.on('end', () => console.log('Done with execute'));
    const readFile = (url, cb) => {
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
    cb(null, data);
    });}
    withTime.execute(readFile, 'https://jsonplaceholder.typicode.com/posts/1');
    myEmitter.off('eventOne', c1);
    myEmitter.off('eventOne', c2);
    console.log(myEmitter.listenerCount('eventOne'));
    console.log(withTime.rawListeners("begin"));