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

{% set code %}

# schrijf hier je code:

{% endset %}

{% include "editor.html" %}

## Een programma met meerdere commando's

Meerdere commando's die achter elkaar geschreven worden zullen in volgorde van eerste tot laatste worden uitgevoerd.
Bijvoorbeeld dit programma

```python
print("Welcome to Introduction to Programming!")
print("First we will practice using the print command.")
print("This program prints three lines of text on the screen.")
```

drukt de volgende regels af op het scherm:

<sample-output>

Welcome to Introduction to Programming!
First we will practice using the print command.
This program prints three lines of text on the screen.

</sample-output>

<in-browser-programming-exercise name="Fix the code: Seven Brothers" tmcname="part01-02_seven_brothers">

"Seitsemän veljestä" is een van de eerste romans die ooit in het Fins geschreven werd. Het verhaal gaat over zeven weesbroers die leren hun weg te vinden in de wereld ([lees meer op Wikipedia](https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4)).

Dit programma zou de namen van de broers in alfabetische volgorde moeten afdrukken, maar het werkt nog niet helemaal goed. Repareer het programma zodat de namen in de juiste volgorde worden afgedrukt.

```python
print("Simeoni")
print("Juhani")
print("Eero")
print("Lauri")
print("Aapo")
print("Tuomas")
print("Timo")
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

## Commentaren

Elke regel die begint met het pond-teken `#`, ook bekend als een hash of een nummerteken, is een commentaar. Dit betekent dat alle tekst op die regel na het `#` symbool op geen enkele manier van invloed is op hoe het programma functioneert. Python zal het gewoon negeren.

Commentaren worden gebruikt om uit te leggen hoe een programma werkt, zowel voor de programmeur zelf als voor anderen die de programmacode lezen. In dit programma legt een commentaar de berekening uit die in de code wordt uitgevoerd:

```python
print("Hours in a year:")
# er zijn 365 dagen in een jaar en 24 uur per dag
print(365*24)
```

Wanneer het programma wordt uitgevoerd, zal het commentaar niet zichtbaar zijn voor de gebruiker:

<sample-output>

Hours in a year:
8760

</sample-output>

Korte commentaren kunnen ook toegevoegd worden aan het einde van een regel:

```python
print("Hours in a year:")
print(365*24) # 365 dagen, 24 uur per dag
```

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

<!--

Een quiz om de inhoud van deze sectie te herzien:

<quiz id="f1d6d205-dfd6-5c6f-b148-b332dfd64289"></quiz>

-->
