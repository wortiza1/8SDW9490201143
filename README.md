# Examen Parcial 1 — Desarrollo Web

## Descripción

En este examen parcial se presenta un proyecto web que contiene diferentes problemas relacionados con **estilos CSS y funcionalidad JavaScript**.

El objetivo del examen es que el estudiante sea capaz de:

* Inspeccionar el código fuente existente.
* Identificar errores en HTML, CSS y JavaScript.
* Analizar las causas de los problemas.
* Corregir los errores encontrados.
* Mantener la estructura general del proyecto.
* Aplicar buenas prácticas de desarrollo web.
* Verificar que la aplicación funcione correctamente después de realizar las correcciones.

---

## 1. Obtener el proyecto base

El proyecto base se encuentra en el siguiente repositorio:

**https://github.com/ingVillatoroUMG/ExamenParcial1DWB.git**

Debe realizar un `git clone` del repositorio:

```bash
git clone https://github.com/ingVillatoroUMG/ExamenParcial1DWB.git
```

Ingrese al directorio del proyecto:

```bash
cd ExamenParcial1DWB
```

---

## 2. Crear un repositorio personal

Después de clonar el proyecto, **NO debe realizar la entrega directamente sobre el repositorio original**.

Cada estudiante debe crear un **nuevo repositorio personal y privado** en GitHub con el nombre EXAMEN_CARNET.

### Requisitos del nuevo repositorio

El repositorio debe cumplir con las siguientes condiciones:

* Debe ser un repositorio **nuevo**.
* Debe ser **privado**.
* Debe pertenecer a la cuenta personal del estudiante.
* Debe contener los fuentes correspondientes al examen.


---

##  3. Crear la rama de entrega

Los cambios realizados para resolver el examen deben encontrarse en una rama llamada exactamente:

```text
examenparcial1
```

Para crear la rama:

```bash
git checkout -b examenparcial1
```

También puede utilizar:


---

## 4. Subir el proyecto al nuevo repositorio

Una vez creado el repositorio privado, debe asociar el proyecto local con el nuevo repositorio.

Por ejemplo:

```bash
git remote remove origin
```

Luego agregue como `origin` la URL de su nuevo repositorio:

```bash
git remote add origin URL_DE_SU_REPOSITORIO
```

Verifique la configuración:

```bash
git remote -v
```

Posteriormente agregue los archivos:

```bash
git add .
```

Realice el commit:

```bash
git commit -m "Solución examen parcial 1"
```

Finalmente, suba la rama:

```bash
git push -u origin examenparcial1
```

###  Importante

La solución del examen debe estar disponible en:

```text
examenparcial1
```

No se evaluará únicamente el contenido de `main` o `master`.

El repositorio debe permanecer **privado**.

Debe invitar como colaborador al usuario:

```text
ingVillatoroUMG
```

### Importante

La invitación al usuario `ingVillatoroUMG` es un requisito de la entrega.

Si el repositorio permanece privado y no se tiene acceso, no será posible realizar la evaluación del código.

---

# 5. Información del estudiante

En el **pie de página (footer)** de la página web debe colocarse la información del estudiante.

Debe incluir como mínimo:

```text
Nombre completo del estudiante
Carné
Curso
```

Por ejemplo:

```text
Juan Pérez López | Carné: 1234-56-789 | Desarrollo Web
```

La información debe ser visible en el `footer` de la página.

---


**Éxitos en el examen.**