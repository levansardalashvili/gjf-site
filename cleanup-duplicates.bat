@echo off
echo GJF საიტის ძველი, დუბლირებული ფაილების წაშლა...
echo.
echo ეს სკრიპტი უნდა გაუშვა შენი gjf-site საქაღალდის შიგნით
echo (იმავე დონეზე, სადაც არის app, components, package.json)
echo.
pause

rmdir /s /q "app\news"
rmdir /s /q "app\calendar"
rmdir /s /q "app\clubs"
rmdir /s /q "app\contact"
rmdir /s /q "app\federation"
rmdir /s /q "app\gallery"
rmdir /s /q "app\judo"
rmdir /s /q "app\results"
rmdir /s /q "app\teams"
del "app\page.js"

echo.
echo დასრულდა! ახლა გაუშვი: npm run dev
pause
