# My portifolio!
My portifolio!

<p align="center">
 <img src="./media/demo.gif"
   alt="Gif showing how the site looks."/>
</p>

## to-do
- lazy-loading images. now. (of course, avoiding CLS..). <a href="https://web.dev/articles/lazy-loading-video?hl=pt-br">videos too</a> (or not, webp with minimal JS);
- Update about-me text (I'm 26 now!).


### Generate translation
```bash
static-i18n --fileFormat=yaml --allowHtml=true --o=. --outputOther=pt.html  --outputDefault=pt2.html  --localesPath=locales -l en -i pt src
```

