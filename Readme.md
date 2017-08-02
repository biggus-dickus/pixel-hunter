# «Пиксель-хантер» [![Build status][travis-image]][travis-url]

Пиксель-хантер — это онлайн-игра, в которой игроку предлагается отличать фотографии от фотореалистичных изображений.

Сыграть-потрогать можно тут: https://biggus-dickus.github.io/pixel-hunter. Временами сервер тупит, из-за чего загрузочный экран показывается слишком долго (игра не начнется, пока не придут все картинки). Тут уж ничего не поделать: бэкенд чужой, и проект хостится на `gh-pages`. Ждите и жмите `F5`, `Ctrl + Shift + R`, и вам обязательно повезет:)

## О проекте
Игра является SPA-приложением, написанным на чистом ECMAScript-2015 (ES6) без использования каких-либо фреймворков или библиотек. В основу программной архитектуры положен подход MVP.

Сборка осуществляется при помощи `Gulp` и `Rollup`, новый синтаксис проходит трансформацию в конструкции ES5 при помощи `Babel`. Для обеспечения корректной работы некоторых новейших возможностей стандарта (например, `fetch()`) используются полифиллы.

## Тестирование
Базовый функционал приложения покрыт автоматическими тестами (`Mocha`), но только в CLI-окружении, без проверки в браузере. Запустить тесты: `gulp test`.

## Изменения и доработка
Исходный код проекта доступен на свободной основе. Для быстрого локального развертывания необходимо выполнить следующее:

1. Склонировать проект и перейти в корневую директорию.
2. Установить все необходимые зависимости: `npm install`. Версии используемых библиотек жестко зафиксированы в `package.json`, для корректной сборки требуется **LTS-версия NodeJS** (*6.10.3* на момент завершения работы над приложением).
3. Запустить задачу сборки по умолчанию (с поднятием локального сервера): `npm start` или `gulp`.

---

## Описание функциональности
### Экраны приложения
Приложение состоит из нескольких последовательно переключающихся экранов. По ходу игры пользователь переходит от первого экрана к последнему. Часть экранов отвечает за игровой процесс: экран начала игры, на котором пользователь вводит свое имя, и экран игрового шага; другая же часть экранов отвечает за вспомогательные сценарии, такие как сравнение результатов игрока с его предыдущими играми.

#### Экран загрузки
Вначале должны загрузиться все изображения, которые будут показаны в процессе игры. В течение загрузки изображений пользователь видит экран загрузки. По завершении загрузки всех изображений автоматически совершается переход к приветственному экрану.

#### Приветственный экран
Переход на этот экран осуществляется кроссфейдом: пока фон предыдущего экрана плавно скрывается, фон этого экрана плавно показывается.

Приветственный экран содержит краткие правила игры. После ознакомления пользователь переходит на экран начала игры. Также с этого экрана можно перейти на экран лучших результатов.

#### Начало игры
Перед тем как начать игру, пользователь еще раз читает правила, на этот раз более подробные, и вводит свое имя. После нажатия на кнопку `Go` начинается сама игра.

Начиная с этого экрана, в левом верхнем углу страницы появляется ссылка на приветственный экран. Нажатие на эту ссылку возвращает пользователя в начало. Если в этот момент была запущена игра, пользователю сначала показывается диалоговое окно.

#### Игровой шаг
В течение игры пользователь видит поочередно 10 игровых экранов.

Игровой экран может быть одного из трех типов:

- *Два изображения:* в этом режиме для каждого из изображений пользователь должен указать, картина это или фотография. Переход к следующему шагу осуществляется после того, как будут указаны типы для обоих изображений. После выбора варианта ответа ответ менять нельзя. Чтобы засчитался правильный ответ, нужно верно указать тип обоих изображений. Ошибка хотя бы в одном из вариантов засчитывается за неправильный ответ.

- *Одно изображение:* в этом режиме пользователь должен выбрать для показанного изображения, картина это или фотография.

- *Три изображения:* пользователю показывается три изображения, из которых ему нужно выбрать одно по определенному принципу: либо из трех изображений нужно выбрать единственную фотографию, либо единственную картину.

По ходу игры пользователю нужно ответить на все предложенные вопросы. При этом ему дается возможность ошибиться три раза. Количество возможных ошибок показывается в правом верхнем углу по ходу игры.

Время, отведенное на каждый из ответов, ограниченно 30 секундами. Если игрок не успевает ответить на вопрос за отведенное время, за этот ответ ему засчитывается ошибка и происходит переход к следующему шагу. Оставшееся время показывается индикатором в верхней части экрана. Когда у пользователя остается 5 секунд на ответ, индикатор начинает мигать.

Снизу на игровом экране показан индикатор прохождения игры. Каждый из ответов кодируется определенным символом:

- если игрок еще не ответил на вопрос, этот вопрос помечен серым индикатором;
- правильно отвеченный вопрос помечается зеленым цветом;
- если пользователь отвечает на вопрос быстрее чем за 10 секунд, ответ считается быстрым (индикатор правильного ответа с иконкой молнии);
- если ответ на вопрос занял дольше 20 секунд, он считается медленным (индикатор правильного ответа с иконкой черепахи);
- неправильно отвеченный вопрос помечается черным цветом.

#### Результаты игры
По ходу игры пользователю начисляются очки в зависимости от того, как он ответил на вопросы. На экране с результатами игры, показывается конечный результат — победа или поражение — и сравнение результата пользователя с прошлыми играми.

В списке результатов отображается индикатор, аналогичный индикатору прохождения игры. Справа от индикатора приводится количество баллов, заработанных пользователем, или надпись «Fail», если он проиграл.

Под индикатором находится расшифровка, какие бонусы и штрафы были получены по ходу игры: за каждый из быстрых или медленных ответов и за неиспользованные ошибки начисляется бонус или штраф.

Расчет очков производится по следующему принципу:

- за каждый правильный ответ дается 100 очков;
- за каждый быстрый ответ дополнительно начисляется 50 очков. Таким образом, быстрый ответ приносит игроку 150 очков;
- за каждый медленный ответ с игрока снимается 50 очков. Таким образом, каждый медленный ответ приносит игроку 50 очков;
- за каждое неиспользованное право на ошибку добавляется 50 очков.

В конце игры результаты пользователя отправляются на сервер для синхронизации с данными других пользователей.

---

<a href="https://htmlacademy.ru/intensive/ecmascript"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/ecmascript/logo-for-github.svg"></a>

Данный репозиторий был создан в рамках интенсивного онлайн‑курса «[Продвинутый JavaScript](https://htmlacademy.ru/intensive/ecmascript)» от [HTML Academy](https://htmlacademy.ru).

[travis-image]: https://travis-ci.org/htmlacademy-ecmascript/107049-pixel-hunter.svg?branch=master
[travis-url]: https://travis-ci.org/htmlacademy-ecmascript/107049-pixel-hunter
