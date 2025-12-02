---
path: "/part-1/1-getting-started"
title: "Getting started"
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

Na deze sectie:

- Heb je je eerste Python-programma geschreven en uitgevoerd
- Weet je hoe je het print-commando gebruikt
- Kun je programmeren gebruiken voor rekenkundige bewerkingen

</text-box>

Computerprogramma's bestaan uit _commando's_, waarbij elk commando de computer instrueert om een bepaalde actie uit te voeren. Een computer voert deze commando's één voor één uit. Onder andere kunnen commando's gebruikt worden voor berekeningen, dingen in het geheugen van de computer te vergelijken, veranderingen teweeg te brengen in hoe het programma functioneert, berichten door te geven of informatie te vragen aan de gebruiker van het programma.

Laten we beginnen met programmeren door vertrouwd te raken met het `print` commando, dat tekst _afdrukt_. In deze context betekent afdrukken in wezen dat het programma wat tekst op het scherm zal tonen.

Het volgende programma zal de regel "Hi there!" afdrukken:

```python
print("Hi there!")
```

Wanneer het programma wordt uitgevoerd, produceert het dit:

<sample-output>

Hi there!

</sample-output>

Het programma zal niet werken tenzij de code exact geschreven wordt zoals hierboven. Bijvoorbeeld, proberen het print commando uit te voeren zonder de aanhalingstekens, zoals dit

```python
print(Hi there!)
```

zal het bericht niet afdrukken, maar in plaats daarvan een fout veroorzaken:

<sample-output>

<pre>
File "<stdin>", line 1
  print(Hi there!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

Samenvattend, als je tekst wilt afdrukken, moet de tekst volledig tussen aanhalingstekens staan, anders zal Python het niet correct interpreteren.

Schrijf een programma dat een emoticon afdrukt: :-)

<in-browser-programming-exercise name="Print Hello World" tmcname="part01-01_hello_world">

Schrijf een programma dat "Hello, World!" afdrukt.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Print Your Name" tmcname="part01-02_print_name">

Schrijf een programma dat je naam afdrukt. Vervang "Your Name" door je echte naam.

```python
print("Your Name")
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Row, Row, Row Your Boat" tmcname="part01-03_row_your_boat">

Schrijf een programma dat de volgende regels exact afdrukt zoals ze hier geschreven staan, inclusief alle leestekens:

<sample-output>

Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Simple Calculation" tmcname="part01-03_calculation">

Schrijf een programma dat de som van 15 en 27 afdrukt.

</in-browser-programming-exercise>

## Rekenkundige bewerkingen

Je kunt ook rekenkundige bewerkingen in een `print` commando plaatsen. Door het uit te voeren wordt het resultaat van de bewerking afgedrukt. Bijvoorbeeld, het volgende programma

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```

drukt deze regels af:

<sample-output>

7
9
22

</sample-output>

Let op het ontbreken van aanhalingstekens rond de rekenkundige bewerkingen hierboven. Aanhalingstekens worden gebruikt om _strings_ aan te duiden. In de context van programmeren zijn strings reeksen van karakters. Ze kunnen bestaan uit letters, cijfers en elk ander type karakters, zoals leestekens. Strings zijn niet alleen woorden zoals we ze gewoonlijk begrijpen, maar in plaats daarvan kan een enkele string zo lang zijn als meerdere volledige zinnen.
Strings worden meestal exact afgedrukt zoals ze geschreven zijn. Zo produceren de volgende twee commando's twee heel verschillende resultaten:

```python
print(2 + 2 * 10)
print("2 + 2 * 10")
```

Dit programma drukt af:

<sample-output>

22
2 + 2 \* 10

</sample-output>

Met de tweede regel code berekent Python niet het resultaat van de bewerking, maar drukt in plaats daarvan de bewerking zelf af, als een string.
Dus, strings worden afgedrukt precies zoals ze geschreven zijn, zonder enige verwijzing naar hun inhoud.

<in-browser-programming-exercise name="Minutes in a year" tmcname="part01-04_minutes_in_a_year">

Schrijf een programma dat het aantal minuten in een jaar afdrukt. Gebruik Python code om de berekening uit te voeren, zoals in het vorige codevoorbeeld.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Print some code" tmcname="part01-05_print_code">

Tot nu toe heb je waarschijnlijk dubbele aanhalingstekens `"` gebruikt om strings af te drukken. Naast de dubbele aanhalingstekens accepteert Python ook enkele aanhalingstekens `'`.

Dit komt van pas als je ooit de aanhalingstekens zelf wilt afdrukken:

```python

print('"Come right back!", shouted the police officer.')

```

<sample-output>

"Come right back!", shouted the police officer.

</sample-output>

Schrijf een programma dat het volgende afdrukt:

<sample-output>

print("Hello there!")

</sample-output>

</in-browser-programming-exercise>
