# TODO

## Koniecznie

- ~~obrazy wczytywane muszą być przerabiane na obrazy w skali szarości~~
- ~~histogramy wczytywane razem z obrazami (w zakładce) (plotly.js)~~
    - ~~Czy na pewno chcemy je w zakładce? Może lepiej niech będą cały czas widoczne?~~

## Dobrze by było
- ~~wywalić kod JS z index.html do modułów~~
- skalowanie wczytywanych obrazów

## Ewentualnie
- możliwość wykonania sekwencji modyfikacji na obrazie
- ~~pozbyć się node.js i zrobić wszystko w HTML5 po stronie klienta~~
    - ~~Menu: HTML + CSS~~
    - ~~Dostęp do lokalnego systemu plików: [File API](https://developer.mozilla.org/pl/docs/Using_files_from_web_applications)~~

---
### Ćwiczenie 1: Algorytm i program rozciąganie i wyrównywania histogramu
- ~~Zadanie 1~~
    - Opracować algorytm i uruchomić aplikację tworzenia, rozciągania i wyrównywania
histogramu według 3 metod przedstawionych na wykładzie oraz według metody
własnej

### Ćwiczenie 2: Algorytmy i aplikacje realizujące zadane operacje punktowe
- ~~Zadanie 1~~
	- typowe operacje punktowe

- ~~Zadanie 2~~
	- uniwersalna operacja punktowa jednoargumentowa

- ~~Zadanie 3~~
	- operacje arytmetyczne (ADD, SUB, Difference) i logiczne (OR, AND, XOR)

### Ćwiczenie 3: Operacje sąsiedztwa
- ~~Zadanie 1~~
    - a)
        - Wygładzanie liniowe oparte na 4 typowych maskach wygładzania.
        - Wyostrzanie liniowe oparte na 4 maskach laplasjanowych.
        - Detekcja krawędzi oparta na 3 maskach detekcji krawędzi.
    - b)
        - Uniwersalna operacja liniowa (wygładzanie i wyostrzanie oparte na masce 3x3 o wartościach zadawanych w sposób interakcyjny).  
        *Uwaga: zastosować opcjonalnie znane metody operacji na skrajnych wierszach i kolumnach obrazu oraz 3 metody skalowania (w przypadku operacji wyostrzania i detekcji krawędzi).*
- Zadanie 2
    - Uniwersalna operacja medianowa oparta na otoczeniu 3x3, 3x5, 5x5, 7x7.  
    *Uwaga: zastosować opcjonalnie znane metody operacji na skrajnych wierszach i kolumnach obrazu.*
- Zadanie 3
    - Uniwersalna operacja logiczna wygładzania o kierunkach 0 i 90 stopni.  
    *Uwaga: zastosować opcjonalnie wybrane metody operacji na skrajnych wierszach i kolumnach obrazu.*
- Zadanie 4
    - Uniwersalna operacja wyostrzania gradientowego (2 maski uniwersalne, 2 maski Robertsa, 2 maski Sobela, 2 maski Prewitt).  
    *Uwaga: zastosować opcjonalnie wybrane metody operacji na skrajnych wierszach i kolumnach obrazu oraz 3 metody skalowania.*

### Ćwiczenie 4: Algorytmy i aplikacje realizujące zadane operacje wygładzania, wyostrzania, morfologiczne
- Zadanie 1
	- Opracować algorytm i uruchomić aplikację realizującą liniową operację sąsiedztwa opartą na masce 5x5
utworzonej na podstawie dwóch masek 3x3 użytych w dwuetapowej (1-szy etap wygładzanie, 2-gi etap wyostrzanie) operacji filtracji. 
	- Opracowaną aplikację przetestować na wybranych obrazach i porównać wyniki
otrzymane przy użyciu maski 5x5 z wynikami uzyskanymi przy użyciu kolejno dwóch masek 3x3.
	- Zastosować 
		- opcjonalnie trzy z pięciu podanych na wykładzie metod operacji na brzegowych pikselach obrazu 
			- pozostawienie wartości pikseli brzegowych bez zmian, 
			- powielenie wartości pikseli brzegowych, 
			- operacje na pikselach z istniejącego sąsiedztwa
		- oraz trzy metody skalowania 
			- proporcjonalna, 
			- trójwartościowa, 
			- obcinająca.

- ~~Zadanie 2~~
	- Korzystając z podanego na wykładzie algorytmu ścieniania opracować i uruchomić aplikację realizującą przekształcenie utworzonego obiektu (wraz z inicjałami twórcy aplikacji) w szkielet (szkielety).
	- Zastosować jedną z 5 podanych na wykładzie metod operacji na brzegowych pikselach obrazu oraz metodę własną.~~
- ~~Zadanie 3~~
	- Operacje erozji, dylatacji, otwarcia, zamknięcia dla dwóch przypadków elementu strukturalnego: 
		- a) romb (czterosąsiedztwo), 
		- b) kwadrat (ośmiosąsiedztwo)
	- Opracowanie algorytmu i realizacja programowa
	- Zastosować jedną z 5 podanych na wykładzie metod operacji na brzegowych pikselach obrazu oraz metodę własną.


### Ćwiczenie 5: Algorytmy i programy segmentacji i analizy obrazu
- Zadanie 1
	- Opracować algorytm i uruchomić aplikację realizującą segmentację obrazów metodami: 
		- progowania, 
		- rozrostu
		- obszaru, 
		- dołączania, 
		- podziału, 
		- podziału i dołączania
- Zadanie 2
	- Opracowanie algorytmu i uruchomienie aplikacji realizującej segmentację opartą na opisie tekstury; 
		- a) obliczanie deskryptorów tekstury (texture descriptors), 
		- b) obliczanie histogramów różnic poziomów jasności (histograms of gray-level differences), 
		- c) obliczanie ciągów pikseli o takiej samej wartości (run length statistics).

- Zadanie 3
	- Opracować algorytm i uruchomić aplikację realizującą wyznaczanie następujących składowych wektora cech obiektu binarnego: 
		- współczynników kształtu (shape features), 
		- momentów (moment descriptors) oraz momentu centralnego (central moment), 
		- środka masy i ukierunkowania (center of mass and orientation). 
		- Program przetestować na podstawowych figurach geometrycznych (trójkąt, kwadrat, okrąg itp.).

- ~~Zadanie 4~~
	- Opracowanie aplikacji realizującej opis obrazu z wykorzystaniem algorytmu żółwia
