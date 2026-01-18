#!/bin/bash
# Скрипт для сборки Docker-образа и деплоя его на Docker Hub  с синхронизацией версий

echo "=== Деплой на Docker Hub ==="

# 0. Очистка старых <none> образов
echo "🧹 Очистка мусора..."
docker image prune -f

# 1. Получение версию из package.json
VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\([^"]*\).*/\1/')
echo "Версия из package.json: $VERSION"

# 2. Получение git commit hash (с проверкой ошибок)
if command -v git &> /dev/null; then
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
echo "Сборка Docker-образа..."
docker build -t minesweeper .

# 4. Тегирование несколькими способами
echo "Тегирование Docker-образа..."
docker tag minesweeper jurisberkulis/minesweeper:$VERSION
docker tag minesweeper jurisberkulis/minesweeper:latest

# Если есть git hash, тегируем и его
if [ -n "$GIT_HASH" ]; then
    docker tag minesweeper jurisberkulis/minesweeper:$VERSION-$GIT_HASH
fi

# 5. Пуш
echo "Загрузка на Docker Hub..."
docker push jurisberkulis/minesweeper:$VERSION
docker push jurisberkulis/minesweeper:latest

# Если есть git hash, пушим и его
if [ -n "$GIT_HASH" ]; then
    docker push jurisberkulis/minesweeper:$VERSION-$GIT_HASH
fi

# 6. Очистка старых образов (без вывода ошибок)
echo "🧹 Очистка старых Docker образов..."
docker image prune -f 2>/dev/null || true

# 7. Очистка старых версий
# Получаем список всех тегов
TAGS=$(docker images --format "{{.Tag}}" jurisberkulis/minesweeper | sort -V)

# Оставляем последние 3, остальные удаляем
echo "$TAGS" | head -n -3 | while read tag; do
    docker rmi "jurisberkulis/minesweeper:$tag"
done

echo "=== Готово! ==="

echo "Текущие образы minesweeper:"
docker images | grep -E "(minesweeper|jurisberkulis/minesweeper)" | head -5

echo "Образы доступны:"
echo "- jurisberkulis/minesweeper:$VERSION"
if [ -n "$GIT_HASH" ]; then
    echo "- jurisberkulis/minesweeper:$VERSION-$GIT_HASH"
fi
echo "- jurisberkulis/minesweeper:latest"
