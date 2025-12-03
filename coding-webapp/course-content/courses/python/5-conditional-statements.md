---
path: "/python/5-conditional-statements"
title: "Conditional statements"
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use a simple conditional statement in programming
- You will know what a Boolean value is
- You will be able to express conditionals with comparison operators

</text-box>

Thus far, every program we have written has been executed line by line in order. Instead of executing every line of code every single time a program is run, it is often useful to create sections of the program which are only executed in certain situations.

For example, the following code checks whether the user is of age:

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

When the user is over the age of 17, the execution of the program should look like this:

<sample-output>

How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!

</sample-output>

If the user is 17 or under, only this is printed out:

<sample-output>

How old are you? **16**
Next customer, please!

</sample-output>

These examples show us that the value given as input affects which parts of the program are executed. The program contains a _conditional statement_ with a block of code which is executed only if the condition in the statement is true.

In a conditional statement the keyword `if` is followed by a _condition_, such as a comparison of two values. The code block following this header line is only executed if the condition is true.

Notice the colon character following the `if` header. In the following code there is no colon:

```python
age = 10

# no colon at the end of the following line
if age > 17
    print("You are of age.")
```

Upon execution this causes an error:

<sample-output>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</sample-output>

## Comparison operators

Very typically conditions consist of comparing two values. Here is a table with the most common comparison operators used in Python:

| Operator | Purpose                  | Example  |
| :------: | ------------------------ | -------- |
|   `==`   | Equal to                 | `a == b` |
|   `!=`   | Not equal to             | `a != b` |
|   `>`    | Greater than             | `a > b`  |
|   `>=`   | Greater than or equal to | `a >= b` |
|   `<`    | Less than                | `a < b`  |
|   `<=`   | Less than or equal to    | `a <= b` |

Let's have a look at a program which prints out different things based on whether the number the user inputs is negative, positive, or equal to zero:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

Examples of how the program functions with three different inputs:

<sample-output>

Please type in a number: **15**
The number is positive.

</sample-output>

<sample-output>

Please type in a number: **-18**
The number is negative.

</sample-output>

<sample-output>

Please type in a number: **0**
The number is zero.

</sample-output>

## Indentation

Python recognises that a block of code is part of a conditional statement if each line of code in the block is _indented_ the same. That is, there should be a bit of whitespace at the beginning of every line of code within the code block. Each line should have the same amount of whitespace.

For example:

```python
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
```

You can use the Tab key, short for _tabulator_ key, to insert a set amount of whitespace.

When you want to end an indented code block you can use the `Backspace` key to return to the beginning of the line.

<in-browser-programming-exercise name="Orwell" tmcname="part01-21_orwell">

Please write a program which asks the user for an integer number. The program should print out "Orwell" if the number is exactly 1984, and otherwise do nothing.

<sample-output>

Please type in a number: **2020**

</sample-output>

<sample-output>

Please type in a number: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Absolute value" tmcname="part01-22_absolute_value">

Please write a program which asks the user for an integer number. If the number is less than zero, the program should print out the number multiplied by -1. Otherwise the program prints out the number as is. Please have a look at the examples of expected behaviour below.

<sample-output>

Please type in a number: **-7**
The absolute value of this number is 7

</sample-output>

<sample-output>

Please type in a number: **1**
The absolute value of this number is 1

</sample-output>

<sample-output>

Please type in a number: **-99**
The absolute value of this number is 99

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Soup or no soup" tmcname="part01-23_soup_or_no_soup">

Please write a program which asks for the user's name. If the name is anything but "Jerry", the program then asks for the number of portions and prints out the total cost. The price of a single portion is 5.90.

Two examples of the program's execution:

<sample-output>

Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!

</sample-output>

<sample-output>

Please tell me your name: **Jerry**
Next please!

</sample-output>

</in-browser-programming-exercise>

## Boolean values and Boolean expressions

Any condition used in a conditional statement will result in a truth value, that is, either true or false. For example, the condition `a < 5` is true if `a` is less than 5, and false if `a` is equal to or greater than 5.

These types of values are often called _Boolean_ values, named after the English mathematician George Boole. In Python they are handled by the `bool` data type. Variables of type `bool` can only have two values: `True` or `False`.

Any bit of code that results in a Boolean value is called a _Boolean expression_. For example, the condition in a conditional statement is always a Boolean expression, and the words _condition_ and _Boolean expression_ can often be used interchangeably.

The result of a Boolean expression can be stored in a variable just like the result of any numerical calculation:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a is less than 5")
```

<sample-output>

True
a is less than 5

</sample-output>

The Python keywords `True` and `False` can also be used directly. In the following example the `print` command is executed every time, because the value of the condition is `True`:

```python
condition = True
if condition:
    print("This is printed every time.")
```

<sample-output>

This is printed every time.

</sample-output>

<in-browser-programming-exercise name="Calculator" tmcname="part01-25_calculator">

Please write a program which asks the user for two numbers and an operation. If the operation is _add_, _multiply_ or _subtract_, the program should calculate and print out the result of the operation with the given numbers. If the user types in anything else, the program should print out nothing.

Some examples of expected behaviour:

<sample-output>

Number 1: **10**
Number 2: **17**
Operation: **add**

10 + 17 = 27

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **multiply**

4 \* 6 = 24

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **subtract**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Temperatures" tmcname="part01-26_temperatures">

Please write a program which asks the user for a temperature in degrees Fahrenheit, and then prints out the same in degrees Celsius. If the converted temperature falls below zero degrees Celsius, the program should also print out "Brr! It's cold in here!".

The formula for converting degrees Fahrenheit to degrees Celsius can be found easily by any search engine of your choice.

Two examples of expected behaviour:

<sample-output>

Please type in a temperature (F): **101**
101 degrees Fahrenheit equals 38.333333333333336 degrees Celsius

</sample-output>

<sample-output>

Please type in a temperature (F): **21**
21 degrees Fahrenheit equals -6.111111111111111 degrees Celsius
Brr! It's cold in here!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="What to wear tomorrow" tmcname="part01-29_what_to_wear_tomorrow">

Please write a program which asks for tomorrow's weather forecast and then suggests weather-appropriate clothing.

The suggestion should change if the temperature (measured in degrees Celsius) is over 20, 10 or 5 degrees, and also if there is rain on the radar.

Some examples of expected behaviour:

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **21**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **11**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **7**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **3**
Will it rain (yes/no): **yes**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
Make it a warm coat, actually
I think gloves are in order
Don't forget your umbrella!

</sample-output>

</in-browser-programming-exercise>
