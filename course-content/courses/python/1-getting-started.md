---
path: "/python/1-getting-started"
title: "Beginnen"
hidden: false
---

<text-box variant='learningObjectives' name='Leerdoelen'>

Na deze sectie:

- Heb je je eerste Python programma geschreven en uitgevoerd
- Weet je hoe je de print opdracht gebruikt
- Kun je programmeren gebruiken voor rekenkundige bewerkingen

</text-box>

Computerprogramma's bestaan uit _opdrachten_, waarbij elke opdracht de computer instrueert om een bepaalde actie uit te voeren. Een computer voert deze opdrachten een voor een uit. Onder andere kunnen opdrachten gebruikt worden voor berekeningen, vergelijken van dingen in het geheugen van de computer, veranderingen aanbrengen in hoe het programma functioneert, berichten doorgeven, of aan de gebruiker van het programma informatie vragen.

Laten we beginnen met programmeren door vertrouwd te raken met de `print` opdracht, die _tekst_ print. In deze context betekent printen eigenlijk dat het programma wat tekst op het scherm zal tonen.

Het volgende programma zal de regel "Hallo daar!" printen:

```python
print("Hallo daar!")
```

Wanneer het programma wordt uitgevoerd, produceert het dit:

<sample-output>

Hallo daar!

</sample-output>

Het programma zal niet werken tenzij de code exact zo geschreven wordt als hierboven. Bijvoorbeeld, proberen om de print opdracht uit te voeren zonder aanhalingstekens, zoals dit

```python
print(Hallo daar!)
```

zal het bericht niet printen, maar in plaats daarvan een fout veroorzaken:

<sample-output>

<pre>
File "<stdin>", line 1
  print(Hallo daar!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

Samengevat, als je tekst wilt printen, moet de tekst volledig tussen aanhalingstekens staan, anders zal Python het niet correct interpreteren.

Schrijf een programma dat een emoticon print: :-)

<in-browser-programming-exercise name="Print emoticon" tmcname="smiley">

Schrijf een programma dat een emoticon print: :-)

<sample-output>
:-)
</sample-output>

</in-browser-programming-exercise>

## Een programma met meerdere opdrachten

Meerdere opdrachten die een na de andere geschreven worden zullen in volgorde van eerste naar laatste worden uitgevoerd.
Bijvoorbeeld dit programma

```python
print("Welkom bij Inleiding tot Programmeren!")
print("Eerst zullen we oefenen met het gebruik van de print opdracht.")
print("Dit programma print drie regels tekst op het scherm.")
```

print de volgende regels op het scherm:

<sample-output>

Welkom bij Inleiding tot Programmeren!
Eerst zullen we oefenen met het gebruik van de print opdracht.
Dit programma print drie regels tekst op het scherm.

</sample-output>

<in-browser-programming-exercise name="Fix de code: Zeven Broers" tmcname="part01-02_seven_brothers">

"Zeventien Broers" is een van de eerste romans die ooit in het Fins geschreven is. Het verhaal gaat over zeven weesbroers die leren hun weg te vinden in de wereld ([lees meer op Wikipedia](https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4)).

Dit programma zou de namen van de broers in alfabetische volgorde moeten printen, maar het werkt nog niet helemaal. Fix het programma zodat de namen in de juiste volgorde geprint worden.

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

<in-browser-programming-exercise name="Rij, Rij, Rij Je Boot" tmcname="part01-03_row_your_boat">

Schrijf een programma dat de volgende regels exact zo print zoals ze hier geschreven staan, inclusief alle leestekens:

<sample-output>

Rij, rij, rij je boot,
Zachtjes stroomafwaarts.
Vrolijk, vrolijk, vrolijk, vrolijk,
Het leven is maar een droom.

</sample-output>

</in-browser-programming-exercise>

## Rekenkundige bewerkingen

Je kunt ook rekenkundige bewerkingen in een `print` opdracht plaatsen. Bij uitvoering wordt het resultaat van de bewerking geprint. Bijvoorbeeld, het volgende programma

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```

print deze regels:

<sample-output>

7
9
22

</sample-output>

Let op het ontbreken van aanhalingstekens rond de rekenkundige bewerkingen hierboven. Aanhalingstekens worden gebruikt om _strings_ aan te geven. In de context van programmeren zijn strings opeenvolgingen van karakters. Ze kunnen bestaan uit letters, cijfers, en elk ander type karakter, zoals leestekens. Strings zijn niet alleen woorden zoals we ze gewoonlijk begrijpen, maar in plaats daarvan kan een enkele string zo lang zijn als meerdere volledige zinnen.

Strings worden meestal exact zo geprint als ze geschreven zijn. Dus de volgende twee opdrachten produceren twee heel verschillende resultaten:

```python
print(2 + 2 * 10)
print("2 + 2 * 10")
```

Dit programma print:

<sample-output>

22
2 + 2 \* 10

</sample-output>

Met de tweede regel code berekent Python het resultaat van de bewerking niet, maar print in plaats daarvan de bewerking zelf, als string.
Dus strings worden exact geprint zoals ze geschreven zijn, zonder enige verwijzing naar hun inhoud.

## Opmerkingen

Elke regel die begint met het hekjes-symbool #, ook bekend als hash of nummer-teken, is een opmerking. Dit betekent dat alle tekst op die regel na het # symbool geen effect heeft op hoe het programma functioneert. Python zal het gewoon negeren.

Opmerkingen worden gebruikt om uit te leggen hoe een programma werkt, zowel voor de programmeur zelf als voor anderen die de programmacode lezen. In dit programma legt een opmerking de berekening uit die in de code wordt uitgevoerd:

```python
print("Uren in een jaar:")
# er zijn 365 dagen in een jaar en 24 uur per dag
print(365*24)
```

Wanneer het programma wordt uitgevoerd, zal de opmerking niet zichtbaar zijn voor de gebruiker:

<sample-output>

Uren in een jaar:
8760

</sample-output>

Korte opmerkingen kunnen ook aan het einde van een regel toegevoegd worden:

```python
print("Uren in een jaar:")
print(365*24) # 365 dagen, 24 uur per dag
```

<in-browser-programming-exercise name="Minuten in een jaar" tmcname="part01-04_minutes_in_a_year">

Schrijf een programma dat het aantal minuten in een jaar print. Gebruik Python code om de berekening uit te voeren, zoals in het vorige code voorbeeld.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Print wat code" tmcname="part01-05_print_code">

Tot nu toe heb je waarschijnlijk dubbele aanhalingstekens " gebruikt om strings te printen. Naast dubbele aanhalingstekens accepteert Python ook enkele aanhalingstekens '.

Dit komt van pas als je ooit de aanhalingstekens zelf wilt printen:

```python

print('"Kom meteen terug!", riep de politieagent.')

```

<sample-output>

"Kom meteen terug!", riep de politieagent.

</sample-output>

Schrijf een programma dat het volgende print:

<sample-output>

print("Hallo daar!")

</sample-output>

</in-browser-programming-exercise>
