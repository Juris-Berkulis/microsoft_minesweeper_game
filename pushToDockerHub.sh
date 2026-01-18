#!/bin/bash
# Скрипт для сборки Docker-образа и деплоя его на Docker Hub  с синхронизацией версий

echo "=== Деплой на Docker Hub ==="

# 1. Получение версию из package.json
VERSION=$(node -e "console.log(require('./package.json').version)")
echo "Версия из package.json: $VERSION"

# 2. Получение git commit hash
GIT_HASH=$(git rev-parse --short HEAD)
echo "Git commit: $GIT_HASH"

# 3. Сборка Docker-образа
echo "Сборка Docker-образа..."
docker build -t minesweeper .

# 4. Тегирование несколькими способами
echo "Тегирование Docker-образа..."
docker tag minesweeper jurisberkulis/minesweeper:$VERSION
docker tag minesweeper jurisberkulis/minesweeper:$VERSION-$GIT_HASH
docker tag minesweeper jurisberkulis/minesweeper:latest

# 5. Пуш
echo "Загрузка на Docker Hub..."
docker push jurisberkulis/minesweeper:$VERSION
docker push jurisberkulis/minesweeper:$VERSION-$GIT_HASH
docker push jurisberkulis/minesweeper:latest

echo "=== Готово! ==="
echo "Образы доступны:"
echo "- jurisberkulis/minesweeper:$VERSION"
echo "- jurisberkulis/minesweeper:$VERSION-$GIT_HASH"
echo "- jurisberkulis/minesweeper:latest"
