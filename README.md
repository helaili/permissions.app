# permission-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that An app that automatically grant teams the right permission when a repository is created within a GitHub organization

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t permission-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> permission-bot
```

## Contributing

If you have suggestions for how permission-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Alain Hélaïli <helaili@github.com>
