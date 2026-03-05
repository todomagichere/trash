# trash

Repositorio con utilidades en Bash para validar redirecciones HTTP, actualizar múltiples repos Git y reproducir secuencias de notas en terminal.

## Requisitos generales

Dependiendo del script que uses, necesitas:

- `bash`
- `curl` (para `checkredirects.sh`)
- `git` (para `git_pull_folders.sh`)
- `sox` / comando `play` (para `mario.sh` y `bash_seq/seq.sh`)

Dar permisos de ejecución (una sola vez):

```bash
chmod +x *.sh bash_seq/seq.sh
```

---

## Archivos del repositorio (qué hacen y cómo ejecutarlos)

### 1) `README.md`
Documento principal del proyecto. Describe para qué sirve cada archivo y cómo ejecutar los scripts.

---

### 2) `checkredirects.sh`
**Qué hace**
- Lee un archivo CSV/txt (una URL por línea).
- Hace una petición por cada URL usando `curl`.
- Muestra en salida: URL + código HTTP + `OK` (2xx) o `KO` (resto).

**Uso**
```bash
./checkredirects.sh file.csv <session_cookie>
```

- `file.csv` (**obligatorio**): listado de URLs, una por línea.
- `session_cookie` (opcional): valor para enviar en `--cookie`.

> Si no pasas el primer argumento, el script termina con mensaje de uso.

**Ejemplo mínimo válido**
```bash
./checkredirects.sh redirects.csv
```

**Ejemplo con cookie de sesión**
```bash
./checkredirects.sh redirects.csv "SESSIONID=abc123"
```

**Formato sugerido de `redirects.csv`**
```text
https://example.com
https://example.com/login
```

---

### 3) `git_pull_folders.sh`
**Qué hace**
- Recorre las subcarpetas del directorio actual.
- Si detecta que una subcarpeta contiene `.git`, ejecuta `git -C <carpeta> pull`.

**Uso**
```bash
./git_pull_folders.sh
```

**Cómo ejecutarlo correctamente**
1. Sitúate en una carpeta que contenga varios repositorios Git como subdirectorios.
2. Ejecuta el script.

Ejemplo:
```bash
cd ~/proyectos
./ruta/a/trash/git_pull_folders.sh
```

---

### 4) `mario.sh`
**Qué hace**
- Reproduce una melodía corta (tema de Mario) con `play`.
- Imprime arte ASCII/emoji de Mario en terminal.

**Uso**
```bash
./mario.sh
```

**Notas**
- Requiere que `play` esté disponible (`sox`).
- Si no tienes audio configurado, puede sonar silencio o fallar según tu entorno.

---

### 5) `bash_seq/seq.sh`
**Qué hace**
- Reproduce una secuencia de notas leyendo un archivo con símbolos (`c`, `d`, `e`, etc.).
- Mapea cada símbolo a una frecuencia y la reproduce con `play`.

**Uso**
```bash
./bash_seq/seq.sh <archivo_notas.sng> <duracion> <forma_onda>
```

Parámetros:
- `archivo_notas.sng`: archivo con notas, una por línea.
- `duracion`: duración de cada nota (ej. `0.2`).
- `forma_onda`: tipo de onda para `play` (ej. `sine`, `square`, `sawtooth`).

**Ejemplo**
```bash
./bash_seq/seq.sh bash_seq/song1.sng 0.2 sine
```

---

### 6) `bash_seq/song1.sng`
**Qué hace**
- Es un archivo de datos (partitura simple) usado por `bash_seq/seq.sh`.
- Contiene notas por línea (`c`, `d`, `e`, `f`, `g`, `a`, `b`) y también `x` como pausa/silencio.

**Cómo se usa**
- No se ejecuta directamente.
- Se pasa como primer argumento a `bash_seq/seq.sh`.

Ejemplo:
```bash
./bash_seq/seq.sh bash_seq/song1.sng 0.15 sine
```

---

## Ejecución rápida

Si quieres probar todo de forma rápida:

```bash
chmod +x *.sh bash_seq/seq.sh
./mario.sh
./bash_seq/seq.sh bash_seq/song1.sng 0.2 sine
./checkredirects.sh redirects.csv
```

> Crea antes `redirects.csv` con una URL por línea para `checkredirects.sh`.
