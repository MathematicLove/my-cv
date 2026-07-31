# Docker 1

## Docker vs. VM

Виртуальная машина требует операционной системы. То есть ОС будет есть ресурсы из CPU, RAM. При этом для каждого приложения, нужна своя ОС.

Контейнер же, требует RAM, CPU только для контейнера, так как внутри уже используется единная ОС (Linux).

При этом в ВМ при запуске требуется сначала запустить ОС а затем приложение.
В Docker требуется только запуск приложения в контейнере.

То есть docker лучше по:

- Ресурсам (CPU, RAM)
- Размерам (GB)
- Скорость загрузки (приложений)

![Docker vs. VM](../content/arc/docker-vs-vm.png)

Архитектура Docker выглядет следующим образом:

![Docker Arch.](../content/arc/docker-arch-linux.png)

На Windows OS выглядет так:

![Docker Arch. Windows](../content/arc/docker-arch-windows.png)

Однако в реальности на серверах, есть кластеры состоящие из узлов (ноды), для случая, если
один из нодов упадет, работал другой. И выглядет архитектура так:

![Docker Prod.](../content/arc/product-docker.png)

## Как упрощается разработка и установка приложений с Docker

Обычный цикл происходит следующим образом:

1. Программист разрабатывает программу
2. Создается `.war`, `.exe`
3. Программист пишет документацию `.doc`, `.tex`
4. Программист пушит в Git
5. Администратор читает документацию
6. Администратор развертывает приложение на сервере.

![Regular Dev.](../content/arc/regular-dev.png)

Цикл с Docker:

1. Программист разрабатывает программу
2. Создается `.war`, `.exe` и **`Dockerfile`**
3. Программист пишет документацию `.doc`, `.tex`
4. Программист создает образ - Docker image
5. Программист пушит в Dockerhub
6. Администратор берет образ из Dockerhub и развертывает на сервере образ. (любое количество образов)

![Docker Dev.](../content/arc/docker-dev.png)

Проблема:
Вдруг программист сделал что-то не так. Что работало только на его компьютере (локальном). Например добавили маленькую библиотеку, не добавили в документацию. Или что-то было настроенно только под его компьютер, на сервере это работать не будет.

Следовательно администратор говорит программисту исправить, далее такой цикл пока программист не поймет, что что-то не так с зависимостью и ОС.

Docker решает проблему так:
docker на сервере и на локальной машине работает **одинаково**. Если работает на локале то и на сервере гарантированно будет работать.

## Как создается контейнер

У нас есть сервер, на котором установлен Docker.

Так же есть публичные или приватные Docker образы. Они хранятся в Docker Regestry.
Например в DockerHub.

В Docker Regestry хранятся образы (images) например Python, Apache, MongoDB, Postgres, ...

Для того что бы собрать контейнер мы хотим установить туда например Python, WordPress, NGINX. Нужно скачать эти образы:

Делаем командой:

```bash
docker pull python:<version>
docker pull wordpress:<version>
docker pull nginx:<version>
```

После чего на локальном компьютере в локальном Docker Regestry у нас будут нужные образы.

При этом если вводить команду: `docker run <Image Name>` например `docker run mysql`, то Docker все равно скачает из Docker Regestry
нужный образ и зальет в Local Redestry.

При этом можно запускать любое количество одинаковых образов, то есть любое количество контейнеров.
Главное:

- Запускать не на одних портах (например NGINX на порту 80, другой на 81, Postgres на 5432)
- Следить за RAM
- Следить за CPU
- Следить за GPU

![Regestry Example.](../content/arc/regestry-example.png)

## Базовые команды

Docker - это процесс. То есть его так же можно остановить, запустить, убить:

```bash
service docker status
```

```bash
pkill -9 docker
```

Или с colima (macOS):

Установка:

```zsh
brew install colima
colima start
```

```zsh
colima status
```

Сразу же можно проверить установку на локальный регистр контейнер *hello-world*:

```bash
docker run hello-world
```

Вывод:

```bash
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
58dee6a49ef1: Pull complete 
Digest: sha256:...

Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Проверить запущенный контейнер можно командой:

```bash
docker ps
```

Однако! - смысл контейнера `hello-world` в том, что бы просто вывести `Hello from Docker` и информацию, а после выйти.

Поэтому он не отобразиться. Но если написать:

```bash
docker ps -a
```

Можно увидеть:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED         STATUS                     PORTS     NAMES
c51f13750379   hello-world                  "/hello"                 2 minutes ago   Exited (0) 2 minutes ago             admiring_wilbur
```

Можно удалить контейнер (не используемый и не работающий) командой:

```bash
docker rm <CONTAINER ID>
```

Или

```bash
docker rm <NAMES>
```

`NAMES` - задается Docker-ом либо вручную.

Удалив проверим той же командой:

```bash
docker ps -a
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED         STATUS                    PORTS     NAMES
```

**Однако! У нас все еще остался image (образ) нашего `hello-world`!**

Для просмотра всех образов которые у нас есть:

```bash
docker images
```

Вывод:

```bash
IMAGE                                     ID             DISK USAGE   CONTENT SIZE   EXTRA
hello-world:latest                        c3cbe1cc1aa5       17.1kB         4.77kB
```

Удалить образ можно таким образом:

```bash
docker rmi <ID>
```

Пример:

```bash
docker rmi c3cbe1cc1aa5
```

Вывод:

```bash
Untagged: hello-world:latest
Deleted: sha256:...
```

### Ubuntu image

Давайте попробуем скачать образ Ubuntu:

```bash
docker pull ubuntu
```

Попробуем запустить:

```bash
docker run ubuntu
```

Вывод:

```bash
Using default tag: latest
latest: Pulling from library/ubuntu
693710ba2039: Pull complete 
55237ac9880d: Pull complete 
Digest: sha256:...
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest
```

Запускаем контейнер:

```bash
docker run ubuntu
```

**Важно** отметить, что скачивание образа и запуск Ubuntu - это не скачивание и запуск процесса!

То есть, вы просто скачиваете образ. При запуске - нет никакого процесса. Поэтому, как и в случае с `hello-world`,
мы запустим контейнер и он сразу отключится.

Проверка:

```bash
docker ps -a
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS                      PORTS     NAMES
cc38b97b43ce   ubuntu                       "/bin/bash"              38 seconds ago   Exited (0) 38 seconds ago             elated_heyrovsky
```

Статус `Exited (0)` - говорит о том, что контейнер завершил работу и вышел с кодом `0`. То есть все хороошо.

Как было сказано ранее, это происходит из-за того, что мы не запускаем какой-либо процесс.

Но можно изменить это немного:

```bash
docker run ubuntu sleep 5
```

Конечно это и не запуск ОС Ubuntu, но это создание процесса в Ubuntu которая говорит о том, что нужно подождать 5 секунд.

```bash
docker ps -a
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS                      PORTS     NAMES
cc988e4098db   ubuntu                       "sleep 5"                20 seconds ago   Exited (0) 14 seconds ago             lucid_newton
cc38b97b43ce   ubuntu                       "/bin/bash"              4 minutes ago    Exited (0) 4 minutes ago              elated_heyrovsky
```

То есть как видно, что контейнер работает так же как и обычная программа.

Давайте в фоновом режиме запустим контейнер Ubuntu при этом выполняя команду в Ubuntu: `sleep 10`, и посмотрим на него как на работающий процесс:

```bash
docker run -d ubuntu sleep 10
```

**На заметку**: `-d` означает detached mode. (в фоновом режиме).

```bash
docker ps 
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS          PORTS     NAMES
40b5494d46ba   ubuntu                       "sleep 10"               4 seconds ago    Up 3 seconds              agitated_blackwell
```

Статус: `Up 3 seconds` - означает, что контейнер запущен и работает уже как 3 секунды.

Что бы не создавать контейнеры по новой, можно воспользоваться старыми контейнерами командой `start`.

Команда берет уже готовый контейнер по его ID и запускает его. (Вместо `run` которая собирает контейнер).

- Смотрим на завершенные контейнеры:

```bash
docker ps -a
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS                      PORTS     NAMES
40b5494d46ba   ubuntu                       "sleep 10"               4 minutes ago    Exited (0) 4 minutes ago              agitated_blackwell
cc988e4098db   ubuntu                       "sleep 5"                7 minutes ago    Exited (0) 7 minutes ago              lucid_newton
cc38b97b43ce   ubuntu                       "/bin/bash"              11 minutes ago   Exited (0) 11 minutes ago             elated_heyrovsky
```

- Запускаем завершенный контейнер:

```bash
docker start 40b5494d46ba
```

Смотрим на работающие контейнеры:

```bash
docker ps
```

Вывод:

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS          PORTS     NAMES
40b5494d46ba   ubuntu                       "sleep 10"               5 minutes ago    Up 9 seconds              agitated_blackwell
```

Действительно работает! Мы запустили уже ранее созданный контейнер, вместо того, что бы заново собрать и запустить его.

То есть:

- `start` - запускает контейнер
- `run` - собирает контейнер

Удалим все контейнеры:

```bash
docker rm <CONTAINER ID1> <CONTAINER ID2> <CONTAINER ID3> ...
```

**На заметку**: Если `CONTAINER ID` уникальный, можно прописать первые два-три символа id контейнера. Docker поймет и удалит его.

Пример: `CONTAINER ID` = `40b5494d46ba`

Команда: `docker rm 40b`: удалит контейнер с `CONTAINER ID` = `40b5494d46ba`

Удалим теперь **образы**:

```bash
docker images
```

Вывод:

```bash
IMAGE                                     ID             DISK USAGE   CONTENT SIZE   EXTRA
ubuntu:latest                             3131b4cc82a7        176MB         40.7MB     
```

Удаляем:

```bash
Untagged: ubuntu:latest
Deleted: sha256:...
```

### Docker Tag

Docker Tag - это версии образов. Они пишутся после **двоеточия**!

Например:

```bash
docker pull ubuntu:22.04
```

И можно обратиться к нему:

```bash
docker run ubuntu:22.04 echo "Hello Docker!"
```

Вывод:

```bash
Hello Docker!
```

**ВАЖНО!: Если мы не указываем Tag на прямую через двоеточие, то по дефолту Docker запустит Tag: `latest`!**

**На заметку!**: У каждого контейнера есть свои директории! Как и у любой UNIX-подобной ОС.

[[02_docker|Следующая лекция.]]