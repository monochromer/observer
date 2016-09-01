# Observer
Реализация шаблона "Издатель-подписчик" (или "Наблюдатель")

Пример использования
```javascript
import Observer from './observer';

let Person = {
    name: 'John',
    getName() {
        console.log((this.name || this), arguments);
    }
};


let func = Person.getName.bind(Person);

Observer.on('data:load', func);
Observer.emit('data:load', 'some string', 'some value');
Observer.off('data:load', func);
Observer.emit('data:load', 'some string');
```