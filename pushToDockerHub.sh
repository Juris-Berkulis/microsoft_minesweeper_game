#!/bin/bash
# Скрипт для сборки Docker-образа и деплоя его на Docker Hub с синхронизацией версий

# ============ КОНФИГУРАЦИЯ ============
DOCKER_HUB_USERNAME="jurisberkulis" # Мой username на Docker Hub
APP_NAME="minesweeper" # Название приложения (Docker-образа)
IMAGE_NAME="${DOCKER_HUB_USERNAME}/${APP_NAME}" # Полное имя Docker-образа
KEEP_VERSIONS=3 # Сколько старых версий оставлять
# =====================================

echo "=== Деплой на Docker Hub ==="
echo "Пользователь: $DOCKER_HUB_USERNAME"
echo "Приложение:  $APP_NAME"
echo "Полное имя:  $IMAGE_NAME"

# Проверка обязательных параметров
if [ -z "$DOCKER_HUB_USERNAME" ] || [ -z "$APP_NAME" ]; then
    echo "❌ Ошибка: DOCKER_HUB_USERNAME и APP_NAME должны быть заданы!"
    exit 1
fi

# 0. Очистка старых <none> образов
echo "🧹 Очистка мусора..."
docker image prune -f

# 1. Получение версии из package.json (с проверкой файла)
if [ -f "package.json" ]; then
    VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\([^"]*\).*/\1/')
    echo "Версия из package.json: $VERSION"
else
    # Если нет package.json, спросить версию
    echo "Файл package.json не найден"
    read -p "Введите версию образа (например, 1.0.0): " VERSION
    if [ -z "$VERSION" ]; then
        echo "❌ Версия не указана!"
        exit 1
    fi
fi

# 2. Получение git commit hash (с проверкой ошибок)
if command -v git &> /dev/null && [ -d ".git" ]; then
    GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "")
else
    GIT_HASH=""
fi

if [ -n "$GIT_HASH" ]; then
    echo "Git commit: $GIT_HASH"
else
    echo "Git не найден или не инициализирован"
fi

# 3. Сборка Docker-образа
echo "Сборка Docker-образа $APP_NAME..."
docker build -t $APP_NAME .

# 4. Тегирование несколькими способами
echo "Тегирование Docker-образа..."

# Если есть git hash, тегируем и его
if [ -n "$GIT_HASH" ]; then
    docker tag $APP_NAME $IMAGE_NAME:$VERSION-$GIT_HASH
fi

docker tag $APP_NAME $IMAGE_NAME:$VERSION
docker tag $APP_NAME $IMAGE_NAME:latest

# 5. Пуш
echo "Загрузка на Docker Hub..."

# Если есть git hash, пушим и его
if [ -n "$GIT_HASH" ]; then
    docker push $IMAGE_NAME:$VERSION-$GIT_HASH
fi

docker push $IMAGE_NAME:$VERSION
docker push $IMAGE_NAME:latest

# 6. Очистка старых образов (без вывода ошибок)
echo "🧹 Очистка старых Docker образов..."
docker image prune -f 2>/dev/null || true

# 7. Очистка старых версий
echo "Очистка старых версий (оставляем $KEEP_VERSIONS последних)..."
# Получение списка всех тегов для Docker-образа, сортировка по версии
TAGS=$(docker images --format "{{.Tag}}" $IMAGE_NAME 2>/dev/null | grep -v '^<none>$' | sort -V)

# Количество тегов у Docker-образа
TAG_COUNT=$(echo "$TAGS" | wc -l)
echo "Найдено тегов: $TAG_COUNT"

if [ $TAG_COUNT -gt $KEEP_VERSIONS ]; then
    # Количество тегов, которые нужно удалить
    DELETE_COUNT=$((TAG_COUNT - KEEP_VERSIONS))
    echo "Удаляем $DELETE_COUNT старых тегов:"

    # Берем только старые теги (первые DELETE_COUNT)
    echo "$TAGS" | head -n $DELETE_COUNT | while read tag; do
        echo "  Удаляем: $IMAGE_NAME:$tag"
        docker rmi "$IMAGE_NAME:$tag" 2>/dev/null || true
    done
else
    echo "Тегов меньше или равно $KEEP_VERSIONS, очистка не требуется"
fi

echo "=== Готово! ==="

# 8. Вывод информации о текущих образах
echo ""
echo "Текущие образы $APP_NAME:"
docker images | grep -E "($APP_NAME|$IMAGE_NAME)" | head -10

echo ""
echo "📦 Образы доступны на Docker Hub:"

if [ -n "$GIT_HASH" ]; then
    echo "   docker pull $IMAGE_NAME:$VERSION-$GIT_HASH"
fi

echo "   docker pull $IMAGE_NAME:$VERSION"
echo "   docker pull $IMAGE_NAME:latest"

# 9. Сохранение информации о деплое в файл
DEPLOY_LOG="deploy.log"
echo "$(date): $IMAGE_NAME:$VERSION deployed (git: ${GIT_HASH:-none})" >> $DEPLOY_LOG
echo "Информация о деплое сохранена в $DEPLOY_LOG"
