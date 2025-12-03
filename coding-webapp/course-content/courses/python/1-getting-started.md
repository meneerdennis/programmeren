---
path: "/python/1-getting-started"
title: "Getting started"
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section:

- You have written and executed your first Python program
- You know how to use the print command
- You can use programming for arithmetic operations

</text-box>

Computer programs consist of _commands_, where each command instructs the computer to perform a certain action. A computer executes these commands one by one. Among other things, commands can be used for calculations, comparing things in the computer's memory, bringing about changes in how the program functions, passing messages, or asking the user of the program for information.

Let's start programming by getting familiar with the `print` command, which prints _text_. In this context, printing essentially means that the program will show some text on the screen.

The following program will print the line "Hi there!":

```python
print("Hi there!")
```

When the program is executed, it produces this:

<sample-output>

Hi there!

</sample-output>

The program will not work unless the code is written exactly as above. For example, trying to execute the print command without quotation marks, like this

```python
print(Hi there!)
```

will not print the message, but instead cause an error:

<sample-output>

<pre>
File "<stdin>", line 1
  print(Hi there!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

In summary, if you want to print text, the text must be completely enclosed in quotation marks, otherwise Python will not interpret it correctly.

Write a program that prints an emoticon: :-)

<in-browser-programming-exercise name="Print emoticon" tmcname="smiley">

Write a program that prints an emoticon: :-)

<sample-output>
:-)
</sample-output>

</in-browser-programming-exercise>

## A program with multiple commands

Multiple commands written one after another will be executed in order from first to last.
For example this program

```python
print("Welcome to Introduction to Programming!")
print("First we will practice using the print command.")
print("This program prints three lines of text on the screen.")
```

prints the following lines on the screen:

<sample-output>

Welcome to Introduction to Programming!
First we will practice using the print command.
This program prints three lines of text on the screen.

</sample-output>

<in-browser-programming-exercise name="Fix the code: Seven Brothers" tmcname="part01-02_seven_brothers">

"Seventeen Brothers" is one of the first novels ever written in Finnish. The story is about seven orphaned brothers who learn to find their way in the world ([read more on Wikipedia](https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4)).

This program should print the names of the brothers in alphabetical order, but it doesn't quite work yet. Fix the program so that the names are printed in the correct order.

```python
print("Simeoni")
print("Juhani")
print("Eero")
print("Lauri")
print("Aapo")
print("Tuomas")
print("Timo")
```

<sample-output>
Aapo
Eero
Juhani
Lauri
Simeoni
Timo
Tuomas
</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Row, Row, Row Your Boat" tmcname="part01-03_row_your_boat">

Write a program that prints the following lines exactly as they are written here, including all punctuation:

<sample-output>

Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.

</sample-output>

</in-browser-programming-exercise>

## Arithmetic operations

You can also place arithmetic operations in a `print` command. When executed, the result of the operation is printed. For example, the following program

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```

prints these lines:

<sample-output>

7
9
22

</sample-output>

Note the lack of quotation marks around the arithmetic operations above. Quotation marks are used to indicate _strings_. In the context of programming, strings are sequences of characters. They can consist of letters, numbers, and any other type of characters, such as punctuation marks. Strings are not only words as we usually understand them, but instead a single string can be as long as multiple full sentences.

Strings are usually printed exactly as they are written. So the following two commands produce two very different results:

```python
print(2 + 2 * 10)
print("2 + 2 * 10")
```

This program prints:

<sample-output>

22
2 + 2 \* 10

</sample-output>

With the second line of code, Python does not calculate the result of the operation, but instead prints the operation itself, as a string.
So strings are printed exactly as they are written, without any reference to their content.

## Comments

Any line that begins with the pound sign #, also known as a hash or number sign, is a comment. This means that all text on that line after the # symbol has no effect on how the program functions in any way. Python will simply ignore it.

Comments are used to explain how a program works, both for the programmer themselves and for others who read the program code. In this program, a comment explains the calculation performed in the code:

```python
print("Hours in a year:")
# there are 365 days in a year and 24 hours per day
print(365*24)
```

When the program is executed, the comment will not be visible to the user:

<sample-output>

Hours in a year:
8760

</sample-output>

Short comments can also be added at the end of a line:

```python
print("Hours in a year:")
print(365*24) # 365 days, 24 hours per day
```

<in-browser-programming-exercise name="Minutes in a year" tmcname="part01-04_minutes_in_a_year">

Write a program that prints the number of minutes in a year. Use Python code to perform the calculation, as in the previous code example.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Print some code" tmcname="part01-05_print_code">

So far you have probably used double quotation marks " to print strings. In addition to double quotation marks, Python also accepts single quotation marks '.

This comes in handy if you ever want to print the quotation marks themselves:

```python

print('"Come right back!", shouted the police officer.')

```

<sample-output>

"Come right back!", shouted the police officer.

</sample-output>

Write a program that prints the following:

<sample-output>

print("Hello there!")

</sample-output>

</in-browser-programming-exercise>
