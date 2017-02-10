/*
Объекты, создаваемые фабричным методом (или классом), обычно наследуют один и тот же родительский объект; 
они являются подклассами, реализующими специализированные функциональные возможности. Иногда общим предком является тот же класс, который содержит фабричный метод.
Рассмотрим пример реализации этого шаблона, в котором имеются:
• Общий родительский конструктор CarMaker.
• Статический метод объекта CarMaker с именем factory(), который создает объекты-автомобили.
• Специализированные конструкторы CarMaker.Compact, CarMaker.SUV и CarMaker.Convertible, наследующие конструктор CarMaker.
Все эти конструкторы определяются как статические свойства предка, благодаря чему предотвращается засорение глобального пространстваимен, 
а кроме того, при такой организации мы точно знаем, где искать их, когда они нам потребуются.
*/

// родительский конструктор
function CarMaker() {}

// метод предка
CarMaker.prototype.drive = function () {
	return "Vroom, I have "  + this.doors + " doors";
};

// статический фабричный метод
CarMaker.factory = function (type) {
	var constr = type,
		newcar;

	// сообщить об ошибке, если конструктор
	// для запрошенного типа отсутствует
	if (typeof CarMaker[constr] !== "function") {
		throw {
			name: "Error",
			message: constr + " doesn't exist"
		};
	}

	// в этой точке известно, что требуемый конструктор существует
	// поэтому определим отношения наследования с предком,
	// но только один раз
	if (typeof CarMaker[constr].prototype.drive !== "function") {
		CarMaker[constr].prototype = new CarMaker();
	}

	// создать новый экземпляр
	newcar = new CarMaker[constr]();
	// дополнительно можно вызвать какие-либо методы
	// и затем вернуть объект...
	return newcar;
};

// специализированные конструкторы
CarMaker.Compact = function () {
this.doors = 4;
};
CarMaker.Convertible = function () {
this.doors = 2;
};
CarMaker.SUV = function () {
this.doors = 24;
};


var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive(); // “Vroom, I have 4 doors”
solstice.drive(); // “Vroom, I have 2 doors”
cherokee.drive(); // “Vroom, I have 24 doors”