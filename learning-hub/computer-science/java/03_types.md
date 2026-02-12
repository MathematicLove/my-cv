## Типы данных

| Тип     | Значение                              | Размер                                 |
| ------- | ------------------------------------- | -------------------------------------- |
| int     | целые числа                           | 4 байта = 32 бита                      |
| float   | действительные числа                  | 4 байта = 32 бита                      |
| double  | действительные числа двойной точности | 8 байт = 64 бита                       |
| char    | символы                               | 2 байта = 16 бит ([[_remarks#1\|*]]) |
| boolean | логические значения                   | 1 бит ([[_remarks#2\|*]])            |
| long    | большие целые числа                   | 8 байт = 64 бита                       |
| short   | малые целые числа                     | 2 байта = 16 бит                       |
| byte    | байты                                 | 1 байт = 8 бит                         |
### Пример (объявление переменных)
```java
public class Main 
{
	public static void main(String[] args) {
		int a = 5;
		float b = 3.2f;
		double c = 5.23544564543523435;
		char d = 'c';
		char d1 = 'э';
		boolean e = true;
		boolean e1 = 0;
		long f = 234234543634542343422342;
		short g = 32000;
		byte h = 4;
		
		System.out.println("integer: ", a, " float: ", b, " double: ", c, "              char: ", d, " ciryllic char: ", d1, " boolean: ", e, " boolean (num): ",
		e1, " long: ", f, " short: ", g, " byte: ", h);
	}
}
```
#### Вывод:
```bash
integer: 5 float: 3.2 double 5.23544564543523435 char: c ciryllic char: э boolean: 1 boolean 0 long 234234543634542343422342 short: 32000 byte: 4
```


## Строки
В Java, строка являются объектом. То есть существуют заранее определенные методы, которые можно вызвать у строки. 

Пример объявления строки:
```java
String myString = "Hello!";
```
Можно так:
```java
String myString = new String("Hello!");
```
И так:
```java
String myString; 
myString = "Hello!";
```
Пример вызова метода у строки:
```java
String originalString = "H e l  l o    !";
String trimmedString = myString.trim(); // Результат: "Hello!"
```

> *Строки - являются неизменяемыми (immutable)! 
> Вы не можете присвоить строке-переменной значение, а после манипулировать ею. 
> Вы должны объявить новую строку и присвоить ей старую строку*

Пример (неправильно): 
```java 
String originalString = "H e l   l o   !";
originalString.trim();

System.out.println(originalString); // Вывод: "H e l   l o   !"
```

Пример (правильно):
```java
String originalString = "H e l   l o   !";
String trimmedString = originalString.trim();

System.out.println(trimmedString); // Вывод: "Hello!"
```

<u>Почему строки неизменяемы</u>

[[02_intro|Предыдущая лекция.]]   [[04_oop_basic|Следующая лекция.]] 


