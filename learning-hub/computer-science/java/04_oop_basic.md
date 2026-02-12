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

> *Абстракция* - 

> *Инкапсуляция* - 

> *Наследование* - 

> *Полиморфизм* - 

Эти принципы реализованы следующими ключивыми словами:

- `abstract` `interface` - абстракция 
- `extends` - наследование
- `private` `public` `protected` `package private` - инкапсуляция 
- `@Override` `implements` - полиморфизм

Пример абстракции: 

```java
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