<a name="readme-top"></a>

# Belcoda

The all-in-one social change platform built for frontline communities.

<ol>
    <li><a href="#infrastructure">Infrastructure</a></li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#reference">API Reference</a></li>
    <li><a href="#contributing">Issues</a></li>
    <li><a href="#contact">FAQ</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>

<!-- HOW IT WORKS --><a name="infrastructure"></a>

## Infrastructure

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED --><a name="getting-started"></a>

## Getting started

Clone the Belcoda repository and install the dependencies.

```bash
git clone https://github.com/belcoda/belcoda.git
cd belcoda
npm run install
```

You will need to configure environment variables. Start by renaming the sample environment variables file to `.env`.

```bash
mv sample.env .env
```

Make changes as required to your environment variables, including adding API keys for the required services above.

`npm run dev`

Navigate to the port provided on localhost, you should see the Belcoda installation screen. Follow the instructions to create the initial instance.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RUNNING IN PRODUCTION --><a name="production"></a>

## Deployment

To deploy Belcoda, we recommend running it in Docker, using the provider `docker-compose.yml`.

This comes with a built in Redis, for caching, as well as Caddy, as a reverse proxy, and to manage SSL.

**Process:**

2. Install Belcoda on your server, following the installation and configuration instructions above. Make sure the environment variables point to your production database. At startup, Belcoda will automatically run database migrations on your production database.

3. Create a DNS record pointing to your server.

4. Edit `Caddyfile` to ensure the correct domain name is listed.

5. Run `docker compose up --build -d`

6. Belcoda should now be running on your server.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- REFERENCE --><a name="reference"></a>

## Reference

For detailed information, please [see the docs](https://belcoda.notion.site/Documentation-835d2aed77ea4206ba97f6f71b962509).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ISSUES --><a name="issues"></a>

## Issues

If you find an issue or bug, please [open a new issue](https://github.com/belcoda/belcoda/issues).

Before you do, please follow this checklist:

- Search the existing issues (including closed), to make sure it hasn't been asked and answered before.
- Read the Code of Conduct and Contributor's Guidelines.
- Ask in Discord

You can also open an issue as a feature request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FAQ --><a name="faq"></a>

## FAQs

#### Is managed hosting available for Belcoda?

Yes. At the moment, Belcoda is in closed alpha testing, and new users for the managed hosting product are being onboarded directly. For more information, please see [the website](https://belcoda.org).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE --><a name="license"></a>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS --><a name="acknowledgements"></a>

## Acknowledgements

Belcoda depends on some excellent open source software, including SvelteKit, Zapatos, Graphile Worker, Zod, and more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
