---
path: "/python/3-more-about-variables"
title: "Meer over variabelen"
hidden: false
---

<text-box variant='learningObjectives' name='Leerdoelen'>

Na deze sectie

- Zul je variabelen in verschillende contexten kunnen gebruiken
- Zul je weten welk soort data opgeslagen kan worden in variabelen
- Zul je het verschil begrijpen tussen strings, integers en zwevende-komma getallen

</text-box>

Variabelen zijn nodig voor verschillende doeleinden in programmeren. Je kunt variabelen gebruiken om informatie op te slaan die later nodig zal zijn in de uitvoering van het programma.

In Python programmeren worden variabelen zo gemaakt:

`variable_name = ...`

Hier betekent `...` de waarde die opgeslagen is in de variabele.

Bijvoorbeeld, toen je de `input` opdracht gebruikte om een string van de gebruiker te lezen, sloeg je de string op in een variabele en gebruikte je de variabele later in je programma:

```python
name = input("Wat is je naam? ")
print("Hallo, " + name)
```

<sample-output>

Wat is je naam? **Ghosty**
Hallo, Ghosty

</sample-output>

De waarde die in een variabele opgeslagen is kan ook gedefinieerd worden met andere variabelen:

```python
given_name = "Paul"
family_name = "Python"

name = given_name + " " + family_name

print(name)
```

<sample-output>

Paul Python

</sample-output>

Hier zijn de waarden die in de drie variabelen opgeslagen zijn niet verkregen van gebruikersinput. Ze blijven hetzelfde elke keer dat het programma uitgevoerd wordt. Dit wordt _hard-coding_ data in het programma genoemd.

## De waarde van een variabele veranderen

Zoals geïmpliceerd door de naam _variable_, kan de waarde die in een variabele opgeslagen is veranderen. In de vorige sectie merkten we op dat de nieuwe waarde de oude vervangt.

Tijdens de uitvoering van het volgende programma zal de variabele `word` drie verschillende waarden hebben:

```python
word = input("Typ alsjeblieft een woord in: ")
print(word)

word = input("En nog een woord: ")
print(word)

word = "derde"
print(word)
```

<sample-output>

Typ alsjeblieft een woord in: **eerste**
eerste
En nog een woord: **tweede**
tweede
derde

</sample-output>

De waarde die in de variabele opgeslagen is verandert elke keer dat de variabele een nieuwe waarde krijgt.

De nieuwe waarde van een variabele kan afgeleid worden van zijn oude waarde. In het volgende voorbeeld wordt de variabele `word` eerst een waarde toegewezen gebaseerd op gebruikersinput. Dan wordt er een nieuwe waarde toegewezen, wat de oude waarde is met drie uitroeptekens aan het einde toegevoegd.

```python
word = input("Typ alsjeblieft een woord in: ")
print(word)

word = word + "!!!"
print(word)
```

<sample-output>

Typ alsjeblieft een woord in: **test**
test
test!!!

</sample-output>

<text-box variant="hint" name="Een goede naam kiezen voor een variabele">

- Het is vaak nuttig om variabelen te benoemen naar waarvoor ze gebruikt worden. Bijvoorbeeld, als de variabele een woord bevat, is de naam `word` een betere keuze dan, zeg, `a`.

- Er is geen vastgestelde limiet aan de lengte van een variabelenaam in Python, maar er zijn wel enkele andere beperkingen. Een variabelenaam zou moeten beginnen met een letter, en kan alleen letters, cijfers en underscores \_ bevatten.

- Kleine en grote letters zijn verschillende karakters. De variabelen `name`, `Name` en `NAME` zijn allemaal verschillende variabelen. Hoewel deze regel enkele uitzonderingen heeft, zullen we die voor nu negeren.

- Het is een veelgebruikte programmeerpraktijk in Python om alleen kleine letters te gebruiken in variabelenamen. Als de variabelenaam bestaat uit meerdere woorden, gebruik dan een underscore tussen de woorden. Hoewel deze regel ook enkele uitzonderingen heeft, zullen we die voor nu negeren.

</text-box>

## Integers

Tot nu toe hebben we alleen strings opgeslagen in variabelen, maar er zijn ook veel andere soorten informatie die we later willen opslaan en benaderen. Laten we eerst kijken naar integers. Integers zijn getallen die geen decimaal of gebroken deel hebben, zoals `-15`, `0` en `1`.

Het volgende programma maakt de variabele `age`, die een integer waarde bevat.

```python
age = 24
print(age)
```

Het programma print alleen dit:

<sample-output>

24

</sample-output>

Let op het ontbreken van aanhalingstekens hier. In feite, als we aanhalingstekens rond het getal zouden toevoegen, zou dit betekenen dat onze variabele niet meer een integer zou zijn, maar in plaats daarvan een string. Een string kan getallen bevatten, maar wordt anders verwerkt.

Dus, waarom maakt het uit dat variabelen een type hebben, wanneer het volgende programma nog steeds hetzelfde ding twee keer print?

```python
number1 = 100
number2 = "100"

print(number1)
print(number2)
```

<sample-output>

100
100

</sample-output>

Variabele types zijn belangrijk omdat verschillende bewerkingen verschillende soorten variabelen op verschillende manieren beïnvloeden. Laten we kijken naar een voorbeeld:

```python
number1 = 100
number2 = "100"

print(number1 + number1)
print(number2 + number2)
```

Dit print het volgende:

<sample-output>

200
100100

</sample-output>

Voor integer waarden betekent de `+` operator optelling, maar voor string waarden betekent het concatenatie, of "aan elkaar rijgen".

Niet alle operatoren zijn beschikbaar voor alle soorten variabelen. Hoewel getallen gedeeld kunnen worden met de delings operator `/`, veroorzaakt het proberen om een string door een getal te delen een fout:

```python
number = "100"
print(number / 2)
```

<sample-output>
TypeError: unsupported operand type(s) for /: 'str' and 'int'
</sample-output>

## Waarden combineren bij printen

Evenzo zal het volgende programma niet werken, omdat `"Het resultaat is "` en `result` van twee verschillende types zijn:

```python
result = 10 * 25
# de volgende regel produceert een fout
print("Het resultaat is " + result)
```

Het programma print niets uit, maar gooit in plaats daarvan een fout:

<sample-output>

TypeError: unsupported operand type(s) for +: 'str' and 'int'

</sample-output>

Hier vertelt Python ons dat het combineren van twee verschillende soorten waarden niet zomaar zal werken. In dit geval is `"Het resultaat is "` van type string, terwijl de waarde die opgeslagen is in `result` van type integer is.

Als we wel een string en een integer willen printen in een enkele opdracht, kan de integer gecast worden als string met de `str` functie, en kunnen de twee strings dan normaal gecombineerd worden. Bijvoorbeeld, dit zou werken:

```python
result = 10 * 25
print("Het resultaat is " + str(result))
```

<sample-output>

Het resultaat is 250

</sample-output>

De `print` opdracht heeft ook ingebouwde functionaliteiten die het combineren van verschillende soorten waarden ondersteunen. De eenvoudigste manier is om een komma tussen de waarden toe te voegen. Alle waarden zullen geprint worden ongeacht hun type:

```python
result = 10 * 25
print("Het resultaat is", result)
```

<sample-output>

Het resultaat is 250

</sample-output>

Let op dat er automatisch een witruimte karakter toegevoegd wordt tussen de waarden gescheiden door een komma hier.

## Printen met f-strings

Wat als we meer flexibiliteit en controle willen hebben over wat we printen? De zogenaamde _f-strings_ zijn een andere manier om printouts te formatteren in Python. De syntax kan aanvankelijk wat verwarrend lijken, maar uiteindelijk zijn f-strings vaak de eenvoudigste manier om tekst te formatteren.

Met f-strings zou het vorige voorbeeld er zo uitzien:

```python
result = 10 * 25
print(f"Het resultaat is {result}")
```

Laten we dit uit elkaar halen. Helemaal aan het begin van de string die we printen staat het karakter _f_. Dit vertelt Python dat wat volgt een f-string is. Binnen de string, ingesloten in accolades, staat de variabelenaam `result`. De waarde die het bevat wordt een deel van de geprinte string. De printout is exact hetzelfde als in de vorige voorbeelden:

<sample-output>

Het resultaat is 250

</sample-output>

Een enkele f-string kan meerdere variabelen bevatten. Bijvoorbeeld deze code

```python
name = "Mark"
age = 37
city = "Palo Alto"
print(f"Hallo {name}, je bent {age} jaar oud. Je woont in {city}.")
```

print dit:

<sample-output>

Hallo Mark, je bent 37 jaar oud. Je woont in Palo Alto.

</sample-output>

Het is moeilijk om een printout precies zo te maken met de komma-notatie in de `print` opdracht. Bijvoorbeeld, dit programma

```python
name = "Mark"
age = 37
city = "Palo Alto"
print("Hallo", name, ", je bent", age, "jaar oud. Je woont in", city, ".")
```

print het volgende:

<sample-output>

Hallo Mark , je bent 37 jaar oud. Je woont in Palo Alto .

</sample-output>

Let op de automatisch ingevoegde witruimte tussen elk komma-gescheiden deel van de printout. Voorkomen dat `print` de extra spaties toevoegt is technisch mogelijk, maar niet de moeite waard gegeven dat we in plaats daarvan f-strings kunnen gebruiken.

In zijn eenvoud kan de komma-notatie van de `print` opdracht vaak nuttig zijn, maar het veroorzaakt soms meer problemen dan dat het waard is. F-strings zijn meestal een betrouwbaardere optie.

<text-box variant="hint" name="F-strings en Python versies">

Als je een oudere versie van Python gebruikt, werken f-strings mogelijk niet. Ze werden geïntroduceerd in Python versie 3.6. Later in de cursus zul je Python op je eigen computer installeren. Helaas zijn de meer moderne versies van Python niet altijd beschikbaar voor oudere besturingssystemen. Als dat het geval is met je computer, kun je bij oefeningen die het gebruik van f-strings vereisen altijd proberen ze uit te testen in de in-browser oefening templates in deze vroege delen van deze cursus.

</text-box>

<in-browser-programming-exercise name="Extra spatie" tmcname="part01-10b_extra_space">

Je vriend werkt aan een app voor werkzoekenden. Ze stuurt je dit stukje code:

```python
name = "Tim Tester"
age = 20
skill1 = "python"
level1 = "beginner"
skill2 = "java"
level2 = "veteran"
skill3 = "programming"
level3 = "semiprofessional"
lower = 2000
upper = 3000

print("my name is ", name, " , I am ", age, "years old")
print("my skills are")
print("- ", skill1, " (", level1, ")")
print("- ", skill2, " (", level2, ")")
print("- ", skill3, " (", level3, " )")
print("I am looking for a job with a salary of", lower, "-", upper, "euros per month")
```

Het programma zou _exact_ het volgende moeten printen:

<sample-output>

my name is Tim Tester, I am 20 years old

my skills are

- python (beginner)
- java (veteran)
- programming (semiprofessional)

I am looking for a job with a salary of 2000-3000 euros per month
</sample-output>

De code werkt bijna correct, maar niet helemaal. Deze oefening heeft zeer strikte tests, die de output controleren voor elk beetje witruimte.

Repareer de code alsjeblieft zodat de printout er goed uitziet. Let vooral op hoe de komma-notatie in de `print` opdracht automatisch een spatie invoegt rond de verschillende komma-gescheiden delen.

De gemakkelijkste manier om de code zo te transformeren dat het voldoet aan de eisen is om f-strings te gebruiken.

Hint: je kunt een lege regel printen door een lege `print` opdracht toe te voegen, of door het nieuwe regel karakter `\n` in je string toe te voegen.

</in-browser-programming-exercise>

## Zwevende-komma getallen

`Zwevende-komma getal` of _float_ is een term die je vaak zult tegenkomen in programmeren. Het verwijst naar getallen met een decimaalpunt. Ze kunnen op ongeveer dezelfde manier gebruikt worden als integer waarden.

Dit programma berekent het gemiddelde van drie zwevende-komma getallen:

```python
number1 = 2.5
number2 = -1.25
number3 = 3.62

mean = (number1 + number2 + number3) / 3
print(f"Gemiddelde: {mean}")
```

<sample-output>

Gemiddelde: 1.6233333333333333

</sample-output>

<in-browser-programming-exercise name="Rekenkunde" tmcname="part01-11_arithmetics">

Dit programma bevat al twee integer variabelen, `x` en `y`:

```python
x = 27
y = 15
```

Voltooi het programma alsjeblieft zodat het ook het volgende print:

<sample-output>

27 + 15 = 42
27 - 15 = 12
27 \* 15 = 405
27 / 15 = 1.8

</sample-output>

Het programma zou correct moeten werken zelfs als de waarden van de variabelen veranderd worden. Dat is, als de eerste twee regels vervangen worden door dit

```python
x = 4
y = 9
```

zou het programma het volgende moeten printen:

<sample-output>

4 + 9 = 13
4 - 9 = -5
4 \* 9 = 36
4 / 9 = 0.4444444444444444

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix de code: Print een enkele regel" tmcname="part01-12_print_a_single_line">

Elke `print` opdracht print meestal een eigen regel uit, compleet met een regelwisseling aan het einde. Echter, als de `print` opdracht een extra argument `end = ""` krijgt, zal het geen regelwisseling printen.

Bijvoorbeeld:

```python
print("Hallo ", end="")
print("daar!")
```

<sample-output>

Hallo daar!

</sample-output>

Repareer dit programma alsjeblieft zodat de hele berekening, compleet met resultaat, op een enkele regel geprint wordt. Verander het aantal `print` opdrachten dat gebruikt wordt niet.

```python

print(5)
print(" + ")
print(8)
print(" - ")
print(4)
print(" = ")
print(5 + 8 - 4)
```

</in-browser-programming-exercise>
