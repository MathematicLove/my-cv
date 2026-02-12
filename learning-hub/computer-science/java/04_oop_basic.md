## Принципы ООП в Java

Java - в целом([[_remarks#3|*]]) объектно-ориентированный язык. 
Вы не сможете запустить программу java, не создав класс. Причем файл основного кода должен быть назван так же как и главный открытый (public) класс.

Пример:
```java
// Файл: Main.java
public class Main 
{
	public static void main(String[] args) {
		System.out.println("Hello!");
	}
}
```

Так же java чувствителен к регистру. Так например файл Main.java и main.java - два разных файла. Так же `class Main` и `class main`, два разных класса.

Стоит отметить, что все объекты в java, наследуются от главного объекта `Object`. То есть любая реализация метода в `Object`, доступна в любых других объектах. Но могут быть переопределены. 

Как видите, в такой концепции видны принципы ООП:

> *Абстракция* - Метод выделения ключевых характеристик объекта, опуская детали реализации. В Java реализуется через абстрактные классы и интерфейсы, позволяя сосредоточиться на том, что делает объект, а не как. Вообще абстракция сильная вещь, мы бы не умели программировать так как делаем это сейчас, если бы не развивали 
абстракцию все выше и выше от перфокарт до языка по типу `java`, `python`. То есть мы абстрагируемся от того как работает компьютер изнутри и переносим абстракцию на несколько уровней вверх, чем выше тем понятнее язык. Например `ASM`, `C` - языки небольшой абстракции от компьютера, так как мыслим мы в пределах работы компьютера, а не в пределах решения исходной задачи.

- Пример: 
	- Начальник просит реализовать функционал калькулятора. Калькулятор может складывать, вычитать, умножать и делить.
	- Но программист пишет код в сценарии: Создай переменную с плавающей точкой, положи ее в регистр, сдвинь регистр. 
	- Программист `java`, объявляет класс `CalculatorImpl`, в котором реализовывает методы суммы, разницы, умножения и деления. 

> *Инкапсуляция* -  Объединение данных и методов в классе с ограничением доступа к ним (модификаторы `private`, `protected`, `public`). Поля скрываются, а взаимодействие идет через геттеры и сеттеры, защищая целостность данных.

> *Наследование* - Механизм, позволяющий классу (потомку) перенимать свойства и методы другого класса (родителя). Используется ключевое слово `extends` (для классов) или `implements` (для интерфейсов), что способствует повторному использованию кода.

> *Полиморфизм* - Способность объектов вести себя по-разному, имея единый интерфейс. В Java реализуется через переопределение методов (`@Override` — полиморфизм времени выполнения) и перегрузку методов (полиморфизм времени компиляции). 

Принципы реализованы следующими ключивыми словами:

- `abstract` `interface` - абстракция 
- `extends` - наследование
- `private` `public` `protected` `package private` - инкапсуляция 
- `@Override` `implements` - полиморфизм

Пример абстракции: 

```java
// Мы не реализовываем методы, мы лишь объявляем, что есть такие методы, 
// а как они работают уже забота того кто будет это реализовывать
interface CalcOptions 
{
	public double sum(int x, int y);
	public double minus(int x, int y);
	public double divide(int x, int y);
	public double multiply(int x, int y); 
}

class Calc implements CalcOptions 
{
	@Override
	public double sum(int x, int y) {
		return x + y;
	}
}
```

```java
abstract class CalcOptions 
{
	abstract double sum(int x, int y);
	abstract double minus(int x, int y);
	abstract double divide(int x, int y);
	abstract double multiply(int x, int y);
}

class Calc extends CalcOptions 
{
	@Override
	public double sum(int x, int y) {
		return x + y;
	}	
}
```

Пример наследования:

```java
// Кошка является животным, то есть наследует от класса животных некоторые вещи, например кошка как и все животные издает звук.
class Animal 
{
	boolean hasTail = false;
}

class Cat extends Animal 
{
	hasTail = true; 
	// Или так:
	super.hasTail = true;	
}
```

Пример инкапсуляции:

```java
class Card 
{
	private double balance; 
	public String owner;
}

class Person
{
	Card card = new Card();
	void makeMeMillioner() {
		card.balance += 1000000.0; // Ошибка: поле balance приватное
		System.out.println(owner); // Ок! Поле owner открытое
	}
}
```

Пример полиморфизма: 

```java
// Животное издает какой-то звук "Sound", в классе кошек мы уже конкретно реализовываем звук: "Meow"
class Animal
{
	void makeSound() {
		System.out.println("Sounds...");
	}
}

class Cat extends Animal 
{
	@Override
	public void makeSound() {
		System.out.println("Meow, Meow");
	}
}

class Main 
{
	public static void main(String[] args) {
		Animal someAnimal = new Animal();
		Cat cuteCat = new Cat();
		Animal cat = new Cat(); // Ok!
		
		someAnimal.makeSound(); // "Sounds..."
		cuteCat.makeSound(); // "Meow, Meow"
		cat.makeSound(); // "Meow, Meow"
	}
}
```