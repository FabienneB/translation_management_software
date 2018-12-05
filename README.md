# Tongue

A translation management software.

## Interview of a translator

Il y a plusieurs intervenants possibles : le dev, le responsable produit, le content manager / wording manager pour tes langues principales, le traducteur, le reviewer de la traduction… Chacun va avoir des exigences différentes.

La fonctionnalité principale, c’est avoir des statuts différents pour tes “phrases” : en cours de dev (pas toucher), à traduire, (à reviewer), traduit…

Mais mieux vaut ne pas faire quelque chose de trop compliqué. Localeapp était pas si mal, manquait notamment un historique / versioning automatique des traductions. Mais un système de branches à la Git, pas sûr que ça soit nécessaire.

Ah, et la recherche. Ça c’est important. La recherche dans Localeapp était nulle. Il aurait fallu pouvoir donner un scope (est-ce un nom de clef ? Dans quel namespace cherche-ton ? Dans quelle langue ? etc)

Aussi pouvoir donner du contexte, très important (les “notes” de clefs, qui étaient pour nous indiquées dans le Corse de Colombie).

## Design features

- login
- project creation
- yaml downloading
- search (keys / fields)
- conflict management

## Architecture

2 database tables:

- translations (key / language / value): index spread on 2 columns -> key/language.
- word_search (word / keys): inverted index over translation value words. Sorted by words length to first look up the rarest words.

techno: CockroachDB
