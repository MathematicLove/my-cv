## Идентификаторы в Java

Идентификаторы - это имена которые даются что бы опредлять классы, переменные, методы, объекты и др. 

Существуют встроенные имена (их нельзя переопределять). Каждое объявление должно быть уникальным (каждый объект, переменная и т.д. имеет свое имя). 

Пример: 
```java
public class ClassName
{
	public static void methodName(String[] args) {
		int varName = 10;
	}
}
```

Тут `ClassName`, `methodName`, `varName`, `args` - уникальные имена которые задает сам программист.

Есть ограничения на задание имен:
```java
x = 4; // Ошибка, нужно указать тип переменной
int 13x; // Ошибка, переменная не должна начинаться с цифры
int _myVar; // Ок!
int #!; // Ошибка, символы не допсутимы кроме $
int $var; // Ок!
int x; // Ок!
int x1; // Ок!
```

Конечно программист может называть переменные как ему вздумается. Но есть определенные правила которым лучше следовать, что бы сделать код читаемым, для того что бы другие разработчики понимали что это за переменная/класс и т.д.

| Стиль                       | Значение           | Пример                    |
| --------------------------- | ------------------ | ------------------------- |
| UpperCamelCase / PascalCase | классы             | MyClass                   |
| lowerCamelCase              | методы, переменные | myMethod, myVariable      |
| UPPERCASE                   | константы          | EYESCOUNT                 |
| lowercase                   | пакеты             | mytutorials/javatutorial  |
| snake_case                  | миграции           | 001_init_schema.yml       |
| kebab-case                  | репозитории        | java-tutorial/mytutorials |
Так же, названия кратко должны описывать что они делают и зачем нужны. Так программист читающий Ваш код, поймет сразу как он работает. 

Пример:
```java
import org.mytutorials.javatutorial.*;

public class CircleArea 
{
	final double PI = 3.14;
	double radius = 5.5;
	
	public void showCircleArea() {
		System.out.println("Circle area = " + (PI * Math.pow(radius,2)));
	}  
}
```
В примере интуитивно понятно, что у нас есть класс `CircleArea` (площадь круга), константа `PI`($\pi \approx 3.14$), и метод показать площадь круга. 

Пример плохого наименования:
```java
import s.tut.smth.*;
public class ar{
	double pi = 3.14;
	double rad = 5.5;
	public void dosmth(){
		System.out.println(PI*Math.pow(rad,2));	
	} 
}
```

Хоть код и выглядит компактнее, но понять сразу что он делает и зачем трудновато.

[[01_intro|Предыдущая лекция.]]   [[03_types|Следующая лекция.]] 
