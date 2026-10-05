# Charejro — strona ofertowa (portfolio + oferta)

Statyczna, wielopodstronowa strona-wizytówka Cezarego Rybaka (Charejro) — freelancera
tworzącego strony internetowe. Zamiast jednej długiej strony są osobne zakładki, więc
niczego nie trzeba długo przewijać.

## Zakładki (podstrony)

| Plik | Zakładka | Zawartość |
|---|---|---|
| `index.html` | **Start** | Hero (3 przyciski: realizacje / cennik / kontakt), statystyki, „O mnie”, cennik w skrócie, FAQ, CTA |
| `oferta.html` | **Oferta** | 6 usług + proces współpracy (5 kroków) |
| `portfolio.html` | **Portfolio** | 3 realizacje ze zrzutami ekranu i opisami |
| `cennik.html` | **Cennik** | 3 pakiety + gwarancje + FAQ |
| `kontakt.html` | **Kontakt** | WhatsApp, e-mail, telefon, GitHub + formularz |

## Podgląd lokalny

Otwórz `index.html` w przeglądarce — to zwykła strona statyczna, nie wymaga serwera
ani instalowania niczego. Fonty pobierane są z Google Fonts (bez internetu strona użyje
czcionek systemowych, wszystko nadal działa).

## WhatsApp

Numer **+48 501 589 194** jest dodany w trzech miejscach:
- zielony pływający przycisk w prawym dolnym rogu każdej podstrony,
- sekcja „Kontakt” w zakładce Kontakt,
- stopka każdej podstrony.

Linki prowadzą do `https://wa.me/48501589194` z gotową wiadomością startową
(„Dzień dobry, piszę w sprawie strony internetowej.”). Jeśli chcesz zmienić treść
wiadomości, podmiej tekst po `?text=` w linkach (jest w HTML zakodowany procentowo,
np. `%20` to spacja).

## Formularz — jak dostajesz wiadomości

Formularz działa **automatycznie** (bez konta, bez serwera):

1. Klient wypełnia formularz i klika **„Wyślij zapytanie”**.
2. Pokazuje się krótkie zabezpieczenie FormSubmit **„Nie jestem robotem”**
   (jedno kliknięcie — chroni Twoją skrzynkę przed spamem).
3. Klient **wraca automatycznie na stronę** i widzi zielone
   „✅ Wiadomość wysłana!”.
4. Wiadomość trafia na **charejro@gmail.com**.
5. Klient dostaje na swojego maila **potwierdzenie z kopią wiadomości**.

Wszystko jest już aktywowane i przetestowane — nic nie trzeba konfigurować.

> **Dla klientów:** potwierdzenie przychodzi z adresu `autoresponse@formsubmit.co`.
> Jeśli ktoś go nie widzi w skrzynce, powinien zajrzeć do folderu **spam**
> (informuje o tym też zielone potwierdzenie na stronie).

### Co i gdzie można zmienić (kontakt.html)

- **Adres docelowy** — atrybut `action` formularza:
  `https://formsubmit.co/charejro@gmail.com`,
- **Treść potwierdzenia dla klienta** — pole ukryte `name="_autoresponse"`
  (znaki `&#10;` to przejścia do nowej linii),
- **Temat wiadomości** — ustawia się sam na podstawie wybranego tematu zapytania.

### WhatsApp — CallMeBot (opcjonalne, ok. 3 minuty)

Jeśli chcesz dodatkowo dostawać powiadomienie na WhatsApp o każdym zgłoszeniu:
1. Zapisz w telefonie numer bota: **+34 644 51 95 23**.
2. Wyślij do niego na WhatsApp dokładnie wiadomość:
   `I allow callmebot to send me messages`.
3. Bot odpowie Twoim **apikey**.
4. Wklej klucz w `js/script.js` w pole `callmebotKey: ""`.

Uwaga: to statyczna strona, więc klucz jest widoczny w kodzie. CallMeBot ma dzienny
limit wiadomości — dlatego podstawą i tak jest e-mail.

## Responsywność i szybkość

Strona jest przygotowana pod telefony, tablety i komputery oraz pod różne przeglądarki
i systemy (Windows, Linux, macOS, iOS, Android). Zadbano m.in. o:

- **Bezpieczne obszary ekranu** (notch w iPhonie) dla przycisków WhatsApp i „na górę”,
- **pola formularza 16 px**, żeby iOS nie powiększał ekranu przy wpisywaniu,
- **własną strzałkę w liście rozwijanej** (działa tak samo na iOS, Androidzie i Windows),
- **zapasowe style** dla starszych przeglądarek (Safari bez `aspect-ratio`, bez
  `backdrop-filter`, bez `inset`) — nic się wtedy nie rozjeżdża,
- **ciemny motyw kontrolek** (`color-scheme: dark`) — spójnie w Chrome, Edge, Safari, Firefox.

### Wydajność

- Zrzuty ekranu do portfolio są w **3 rozmiarach** (`-640`, `-900`, `-1200` pikseli)
  i przeglądarka sama wybiera najmniejszy potrzebny plik (`srcset`).
  Dzięki temu hero waży ~0,1 MB zamiast ~1,1 MB.
- Oryginalne, pełnowymiarowe zrzuty leżą w `img/oryginaly/` (nie są ładowane przez stronę).
- Obrazy w portfolio ładują się dopiero przy przewijaniu (`loading="lazy"`),
  a każdy ma podane wymiary, więc strona nie „skacze” podczas wczytywania.
- Animacje respektują ustawienie systemowe „ogranicz animacje”
  (`prefers-reduced-motion`).

### Mobilnie (UX i wydajność)

- **Czcionki ładują się asynchronicznie** — nie blokują wyświetlenia strony
  (najpierw widzisz treść, potem podmienia się krój), a nieużywana grubość
  Sora 600 została usunięta.
- Dekoracyjne obrazki w hero (boczne karty) i awatar ładują się **leniwie**.
- Na ekranach ≤ 640 px **wyłączona jest ciągła animacja kart** (mniej pracy
  procesora i baterii), a dekoracja hero jest mniejsza.
- **Efekty „hover” wyłączone na urządzeniach dotykowych** (`@media (hover: none)`) —
  nic nie „przykleja się” po dotknięciu.
- **Większe pola dotykowe**: linki w stopce, dane kontaktowe i linki „Szczegóły”
  mają powiększony obszar kliknięcia; checkbox ma 20 px.
- `touch-action: manipulation` — szybsza reakcja na dotknięcie.
- **Stopka renderuje się dopiero przy dojechaniu na dół** (`content-visibility`),
  co przyspiesza start na telefonie.
- Mini-cennik i przyciski mają osobne, kompaktowe zasady dla małych ekranów.

> Po każdej zmianie plików lokalnie wgraj na GitHub: **wszystkie pliki `.html`
> oraz `css/style.css`** (jeśli zmieniałeś skrypty — także `js/script.js`).

Efekt: audyt **Lighthouse (Chrome) — dostępność 100, dobre praktyki 100, SEO 100**,
a strona główna waży ok. **350 KB** przy pierwszym wejściu (wcześniej ponad 1,5 MB).

## Struktura plików

```
index.html, oferta.html, portfolio.html, cennik.html, kontakt.html
css/style.css                  — wygląd i responsywność (wspólny dla wszystkich stron)
js/script.js                   — menu mobilne, animacje, formularz kontaktowy (sekcja CONFIG)
img/portfolio-*-640.jpg        — miniatury projektów (telefony)
img/portfolio-*-900.jpg        — miniatury projektów (tablety)
img/portfolio-*-1200.jpg       — miniatury projektów (komputery)
img/oryginaly/                 — oryginalne, pełne zrzuty ekranu (nieużywane na stronie)
img/avatar.svg                 — awatar/monogram w sekcji „O mnie”
favicon.svg                    — ikonka strony
```

## Co podmienić przy zmianach

- **Ceny** — `cennik.html` (obecnie 899 / 1499 / 2499 zł „od”).
- **Opisy w portfolio** — `portfolio.html` (sekcje `.project`).
- **Dane kontaktowe** — `kontakt.html`, stopki wszystkich podstron oraz `js/script.js`
  (adres e-mail i numer WhatsApp w sekcji `CONFIG` na górze pliku).
- **Formularz** — tryby wysyłki i klucze do automatyzacji: patrz sekcja „Formularz” wyżej
  oraz sekcja `CONFIG` w `js/script.js`.
- **Zrzuty ekranu** — używane są trzy rozmiary: `img/portfolio-*-640.jpg`,
  `-900.jpg` i `-1200.jpg` (plus oryginały w `img/oryginaly/`). Najprościej podmienić
  wszystkie trzy rozmiary tego samego projektu. Wystarczy też podmienić sam plik `-1200`
  i wygenerować z niego mniejsze (dowolnym programem graficznym).
- **Menu** — w każdym pliku HTML; aktywna zakładka ma `class="active"`.

## Publikacja w internecie (za darmo — GitHub Pages)

1. Zaloguj się na GitHub i utwórz nowe repozytorium, np. `moja-strona-ofertowa`.
2. Wgraj do niego wszystkie pliki HTML oraz foldery `css/`, `js/`, `img/` i `favicon.svg`.
3. Wejdź w **Settings → Pages**, wybierz źródło: gałąź `main` i folder `/ (root)`, zapisz.
4. Po chwili strona będzie dostępna pod adresem:
   `https://TWOJA-NAZWA.github.io/moja-strona-ofertowa/`.
5. Jeśli chcesz mieć własną domenę (np. `charejro.pl`), podłącz ją w Settings → Pages →
   Custom domain — to zwykle kilka złotych rocznie za samą domenę.
