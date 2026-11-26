<div align="center">
  <h1>ALPERONOBERTO.DEV</h1>
  <p><strong>Portfolio personal</strong><br>Sistemas · redes · desarrollo · ciberseguridad</p>
  <p>
    <a href="https://portfolio-a5ceb.web.app"><strong>VISITAR PORTFOLIO ↗</strong></a>
  </p>
  <p><code>HTML</code> &nbsp; <code>CSS</code> &nbsp; <code>JavaScript</code> &nbsp; <code>Firebase Hosting</code></p>
</div>

---

## Capturas

<table>
  <tr>
    <th align="center">Tema claro</th>
    <th align="center">Tema oscuro</th>
  </tr>
  <tr>
    <td><img src=".github/screenshots/portfolio-desktop-light.png" alt="Portfolio en escritorio con tema claro"></td>
    <td><img src=".github/screenshots/portfolio-desktop-dark.png" alt="Portfolio en escritorio con tema oscuro"></td>
  </tr>
</table>

<p align="center"><strong>Vista móvil</strong></p>
<p align="center">
  <img src=".github/screenshots/portfolio-mobile-light.png" alt="Portfolio en móvil" width="320">
</p>

## El proyecto

Un portfolio responsive para presentar experiencia en sistemas y redes, desarrollo web y ciberseguridad. Está construido sin frameworks ni dependencias de ejecución.

### Qué incluye

- Temas claro y oscuro, con preferencia guardada.
- Retrato con inclinación interactiva al pasar el ratón en escritorio.
- Filtros para explorar habilidades por área.
- Laboratorio interactivo con un minijuego y una terminal de comandos.
- Accesos de contacto y visualización del CV en una pestaña nueva.

## Tecnologías

| Capa | Herramientas |
| --- | --- |
| Estructura | HTML5 |
| Estilos | CSS3 |
| Interactividad | JavaScript |
| Hosting y despliegue | Firebase Hosting · GitHub Actions |

## Ejecutar localmente

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático. No hace falta compilar ni instalar dependencias.

## Despliegue

El workflow [`deploy-firebase.yml`](.github/workflows/deploy-firebase.yml) publica en Firebase Hosting cada vez que hay un push a `main`.

Para habilitarlo, añade en **GitHub → Settings → Secrets and variables → Actions** el repository secret `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_A5CEB`, con las credenciales JSON de una cuenta de servicio autorizada para el proyecto Firebase `portfolio-a5ceb`.
