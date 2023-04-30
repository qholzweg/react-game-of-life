# Игра "Жизнь" на React
[English readme](#react-game-of-life)

![React Game of Life](https://github.com/qholzweg/react-game-of-life/blob/master/react-game-of-life.png?raw=true)

Реализация игры "Жизнь" Джона Конвея на реакте. Размер поля, на котором можно размещать клетки настраивается, при этом само поле бесконечно (крайняя клетка на поле соседствует с первой клеткой и по горизонтали и по вертикали).

Demo: https://qholzweg.github.io/react-game-of-life/index.html

##Функционал:
- можно расставить начальное состояние живых клеток и запустить игру
- можно расставить случайные клетки на поле
- можно настроить размер поля и скорость игры. Для отображения поля используется lazy rendering только видимой в браузере области, поэтому даже на поле большого размера игра не будет тормозить
- отображается статистика живых клеток на данный момент


#React Game of Life
Implementation of John Conway's Game of Life in React. The size of the field on which cells can be placed is adjustable, while the field itself is infinite (the last cell on the field is adjacent to the first cell both horizontally and vertically).

##Functionality:
- you can place initial living cells and start the game
- you can place random cells on the field
- you can adjust the size of the field and the speed of the game. Only the area visible in the browser is lazy rendered, so even on a large field the game will not slow down
- displays alive cell count

