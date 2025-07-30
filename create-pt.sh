static-i18n --fileFormat=yaml --allowHtml=true --o=. --outputOther=pt.html  --outputDefault=pt.html  --localesPath=locales --files=index.html  -l en -i pt .
sed -i -e 's/<html lang="en"/<html lang="pt-BR"/' pt.html
sed -i -e 's/onchange="window.location.href=\x27pt.html\x27"/onchange="window.location.href=\x27index.html\x27"/' pt.html
sed -i -e 's/<option value="english" selected/<option value="english"/' pt.html
sed -i -e 's/<option value="portuguese"/& selected/' pt.html
sed -i -e 's/id="ukFlag"/id="brFlag"/' pt.html
