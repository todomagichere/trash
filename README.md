# trash

Este repositorio reúne scripts de Bash para distintas tareas de automatización y utilidades de terminal.

## Estructura y definición de archivos

- `README.md`: documentación principal del repositorio con la descripción de cada archivo.
- `checkredirects.sh`: script para comprobar redirecciones de URLs y validar su comportamiento.
- `git_pull_folders.sh`: script para ejecutar `git pull` de forma masiva en carpetas/proyectos.
- `mario.sh`: script de shell con utilidades/comandos personalizados (según su implementación interna).
- `bash_seq/seq.sh`: script principal relacionado con una secuencia ejecutable dentro del módulo `bash_seq`.
- `bash_seq/song1.sng`: archivo de datos en formato `.sng` usado por `bash_seq/seq.sh` como entrada (por ejemplo, una secuencia o “canción”).

## Uso rápido

1. Dar permisos de ejecución a los scripts necesarios:
   ```bash
   chmod +x *.sh bash_seq/seq.sh
   ```
2. Ejecutar el script deseado, por ejemplo (este script requiere al menos un archivo CSV con URLs):
   ```bash
   ./checkredirects.sh file.csv
   ```

> Nota: algunos scripts pueden requerir dependencias del sistema (por ejemplo, `git`, `curl` o utilidades estándar de Unix).
