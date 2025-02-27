# Визуализатор алгоритмов на графах
Визуализация алгоритмов – это процесс представления работы алгоритмов в форме наглядного, последовательного объяснения, представленного в виде изображений. 

Цель визуализации – помочь людям понять работу алгоритма путем визуального представления шагов его выполнения.

## Описание
Данное приложение позволяет строить графы и пошагово визуализировать выполнение алгоритмов на них. Проект разработан в рамках курсовой работы по программной инженерии.

Онлайн-версия доступна по ссылке: [Визуализатор алгоритмов](https://hse-perm-sandbox.github.io/algoviz-app/)

## Функционал
- Построение графов (ориентированные, неориентированные, взвешенные)
- Редактирование графов (добавление/удаление вершин и рёбер, изменение весов)
- Визуализация алгоритмов:
  - Алгоритм Крускала (поиск минимального остовного дерева)
  - Алгоритм Дейкстры (поиск кратчайшего пути)
  - Алгоритм Демукрона (топологическая сортировка)
- Пошаговый просмотр выполнения алгоритмов
- Сохранение графа и его состояния

## Используемые технологии
- **Язык программирования:** JavaScript
- **Библиотека для визуализации:** [Cytoscape.js](https://js.cytoscape.org/)

## Установка и запуск
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/hse-perm-sandbox/algoviz-app.git
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd graph-visualizer
   ```
3. Откройте `index.html` в браузере

## Использование
1. Постройте граф с помощью панели управления.
2. Выберите алгоритм и запустите его выполнение.
3. Наблюдайте за пошаговой визуализацией процесса работы алгоритма.

## Лицензия
Проект распространяется под лицензией MIT.
